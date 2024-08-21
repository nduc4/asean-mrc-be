import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './data/device.schema';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { UserModule } from 'src/users/user.module';
import { GatewayDevice, GatewayDeviceSchema } from './data/gateway.schema';
import { SensorDevice, SensorDeviceSchema } from './data/sensor.schema';
import {
	DeviceRepo,
	GatewayDeviceRepo,
	SensorDeviceRepo,
} from './data/device.repo';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		UserModule,
		JwtModule,
		ScheduleModule.forRoot(),
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
	controllers: [DeviceController],
	providers: [DeviceService, DeviceRepo, GatewayDeviceRepo, SensorDeviceRepo],
	exports: [SensorDeviceRepo, DeviceService],
})
export class DeviceModule {}
