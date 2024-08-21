import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';
import { DeviceModule } from 'src/devices/device.module';
import { JwtModule } from '@nestjs/jwt';
import {
	GatewayDeviceRepo,
	SensorDeviceRepo,
} from 'src/devices/data/device.repo';
import { LogModule } from 'src/logs/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from 'src/devices/data/device.schema';
import {
	GatewayDevice,
	GatewayDeviceSchema,
} from 'src/devices/data/gateway.schema';
import {
	SensorDevice,
	SensorDeviceSchema,
} from 'src/devices/data/sensor.schema';
import { FirebaseAdminService } from 'src/common/firebase-admin.service';

@Module({
	imports: [
		UserModule,
		DeviceModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('JWT_TOKEN'),
			}),
			inject: [ConfigService],
		}),
		LogModule,
		ClientsModule.registerAsync([
			{
				imports: [ConfigModule],
				inject: [ConfigService],
				name: 'MQTT_SERVICE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.MQTT,
					options: {
						url: `mqtt://${configService.get<string>('IP_MQTT')}:${configService.get<string>('PORT_MQTT')}`,
					},
				}),
			},
		]),
		MongooseModule.forFeature([
			{
				name: Device.name,
				schema: DeviceSchema,
				discriminators: [
					{
						name: GatewayDevice.name,
						schema: GatewayDeviceSchema,
					},
					{
						name: SensorDevice.name,
						schema: SensorDeviceSchema,
					},
				],
			},
		]),
	],
	controllers: [MqttController],
	providers: [
		MqttService,
		GatewayDeviceRepo,
		SensorDeviceRepo,
		FirebaseAdminService,
	],
})
export class MqttModule {}
