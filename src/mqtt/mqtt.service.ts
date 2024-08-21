import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	GatewayDeviceRepo,
	SensorDeviceRepo,
} from 'src/devices/data/device.repo';
import { ForecastDto } from './dto/forecast.dto';
import { GatewayDevice } from 'src/devices/data/gateway.schema';
import { SensorDevice } from 'src/devices/data/sensor.schema';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from 'src/users/data/user.repo';
import { LogService } from 'src/logs/log.service';
import { FirebaseAdminService } from 'src/common/firebase-admin.service';

@Injectable()
export class MqttService {
	constructor(
		@Inject('MQTT_SERVICE') private client: ClientProxy,
		private _sensorDeviceRepo: SensorDeviceRepo,
		private _gatewayDeviceRepo: GatewayDeviceRepo,
		private jwtService: JwtService,
		private _userRepo: UserRepo,
		private logService: LogService,
		private readonly firebaseAdminService: FirebaseAdminService,
	) {}

	async receive(data) {
		switch (data.code) {
			case 1:
				this.createDevices(data);
				break;
			case 2:
				this.report(data);
				break;
			case 4:
				// this.warning(data);
				break;
			default:
				break;
		}
	}

	async createDevices(data) {
		const { token, gateway, sensors } = data;

		let decodedToken;
		try {
			decodedToken = this.jwtService.verify(token);
		} catch (err) {
			console.log('Invalid token');
		}

		const isUserExist = await this._userRepo.getById(decodedToken.sub);
		if (!isUserExist) {
			console.log('Người dùng không tồn tại');
		}

		const isGatewayExist = await this._gatewayDeviceRepo.getOne({
			macAddress: gateway.mac,
		});

		let gatewayDevice;

		if (!isGatewayExist) {
			const dto: GatewayDevice = {
				name: gateway.name,
				macAddress: gateway.mac,
				lat: gateway.lat,
				lon: gateway.lon,
				pub: gateway.pub,
				sub: gateway.sub,
				type: GatewayDevice.name,
				user: isUserExist,
			};
			gatewayDevice = await this._gatewayDeviceRepo.create(dto);
			await this.logService.createLog(
				1,
				gatewayDevice._id,
				'Tạo Gateway',
			);
		} else {
			gatewayDevice = isGatewayExist;
		}

		let createdDevices = 0;

		for (const sensor of sensors) {
			const isSensorExist = await this._sensorDeviceRepo.getOne({
				device_id: gateway.mac + '-' + sensor.id,
			});

			if (!isSensorExist) {
				const dto: SensorDevice = {
					name: sensor.name,
					device_id: gateway.mac + '-' + sensor.id,
					type: SensorDevice.name,
					user: isUserExist,
				};
				const sensorDevice = await this._sensorDeviceRepo.create(dto);
				await this.logService.createLog(
					1,
					gatewayDevice._id,
					`Tạo cảm biến ${sensorDevice.name}`,
				);
				createdDevices++;
			}
		}

		if (createdDevices === 0 && isGatewayExist) {
			await this.logService.createLog(
				0,
				gatewayDevice._id,
				`Khởi động thiết bị`,
			);
		}
	}

	async report(data) {
		if (data.gateway && data.sensors) {
			await this._gatewayDeviceRepo.update(
				{ macAddress: data.gateway },
				{ isActive: true },
			);
			for (const sensor in data.sensors) {
				await this._sensorDeviceRepo.updateById(sensor, {
					isActive: true,
				});
			}
		} else if (data.id && data.content) {
			const id = data.id;
			const regexSensor = new RegExp(`.*-${id}$`);
			const sensor = await this._sensorDeviceRepo.getOne({
				device_id: regexSensor as any,
			});
			const mac = sensor.device_id.split(`-${id}`)[0];
			const gateway = await this._gatewayDeviceRepo.getOne({
				macAddress: mac,
			});
			await this.logService.createLog(
				2,
				gateway._id.toString(),
				`${data.content}`,
			);
		}
	}

	async warning(token: string, payload) {
		return {};
	}

	async forecast(dto: ForecastDto) {
		return {};
	}

	async sendUserNotification(userToken: string, title: string, body: string) {
		const payload = {
			notification: {
				title: title,
				body: body,
			},
		};

		return await this.firebaseAdminService.sendNotification(
			userToken,
			payload,
		);
	}

	async sendMultipleUserNotifications(
		userTokens: string[],
		title: string,
		body: string,
	) {
		const payload = {
			notification: {
				title: title,
				body: body,
			},
		};

		return await this.firebaseAdminService.sendMulticastNotification(
			userTokens,
			payload,
		);
	}
}
