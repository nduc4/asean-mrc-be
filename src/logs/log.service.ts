import { Injectable } from '@nestjs/common';
import { LogRepo } from './data/log.repo';
import { TypeRepo } from 'src/types/data/types.repo';
import { DeviceRepo, GatewayDeviceRepo, SensorDeviceRepo } from 'src/devices/data/device.repo';
import { Log } from './data/log.schema';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';

@Injectable()
export class LogService {
	constructor(
		private readonly _logRepo: LogRepo,
		private readonly _typeRepo: TypeRepo,
		private readonly _deviceRepo: DeviceRepo,
		private readonly _sensorDeviceRepo: SensorDeviceRepo,
		private readonly _gatewayDeviceRepo: GatewayDeviceRepo
	) {}

	async getAllLog(idDto: ObjectIdDto) {
		const gateway = await this._deviceRepo.getById(idDto.id);
		return await this._logRepo.getAll({ device: gateway._id as any });
	}

	async createLog(code: number, gatewayId: string, description: string) {
		const type = await this._typeRepo.getOne({ code: code });
		const device = await this._deviceRepo.getById(gatewayId);
		const dto: Log = {
			type: type,
			device: device,
			description: description,
		};
		return await this._logRepo.create(dto);
	}

	async createLogHttp(code: number, id: string, content: string) {
		const regexSensor = new RegExp(`.*-${id}$`);
		const sensor = await this._sensorDeviceRepo.getOne({
			device_id: regexSensor as any,
		});
		const mac = sensor.device_id.split(`-${id}`)[0];
		const gateway = await this._gatewayDeviceRepo.getOne({
			macAddress: mac,
		});
		await this.createLog(
			code,
			gateway._id.toString(),
			content,
		);
	
	}
}
