import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepo } from './data/log.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './data/log.schema';
import { TypeRepo } from 'src/types/data/types.repo';
import {
	DeviceRepo,
	GatewayDeviceRepo,
	SensorDeviceRepo,
} from 'src/devices/data/device.repo';
import { Type, TypeSchema } from 'src/types/data/types.schema';
import { Device, DeviceSchema } from 'src/devices/data/device.schema';
import {
	GatewayDevice,
	GatewayDeviceSchema,
} from 'src/devices/data/gateway.schema';
import {
	SensorDevice,
	SensorDeviceSchema,
} from 'src/devices/data/sensor.schema';
import { UserRepo } from 'src/users/data/user.repo';
import { User, UserSchema } from 'src/users/data/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
		MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
	controllers: [LogController],
	providers: [
		LogService,
		UserRepo,
		LogRepo,
		TypeRepo,
		GatewayDeviceRepo,
		SensorDeviceRepo,
		DeviceRepo,
	],
	exports: [LogService],
})
export class LogModule {}
