import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from 'src/common/bases/repo';
import { Device } from './device.schema';
import { GatewayDevice } from './gateway.schema';
import { SensorDevice } from './sensor.schema';

export class DeviceRepo extends BaseRepo<Device> {
	constructor(
		@InjectModel(Device.name)
		private readonly deviceModel: Model<Device>,
	) {
		super(deviceModel);
	}
}

export class GatewayDeviceRepo extends BaseRepo<GatewayDevice> {
	constructor(
		@InjectModel(GatewayDevice.name)
		private readonly gatewayDeviceModel: Model<GatewayDevice>,
	) {
		super(gatewayDeviceModel);
	}
}

export class SensorDeviceRepo extends BaseRepo<SensorDevice> {
	constructor(
		@InjectModel(SensorDevice.name)
		private readonly sensorDeviceModel: Model<SensorDevice>,
	) {
		super(sensorDeviceModel);
	}
}
