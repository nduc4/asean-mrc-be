import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/bases/model';
import { DeviceStatus } from 'src/common/enums/deviceStatus.enum';
import { GatewayDevice } from './gateway.schema';
import { SensorDevice } from './sensor.schema';
import { UserModel } from 'src/users/data/user.model';

export class DeviceModel extends BaseModel {
	@ApiProperty({ example: 'Cổng vào hoặc cảm biến lượng mưa' })
	public name: string;

	@ApiProperty({ required: false })
	manufacturingDate?: Date;

	@ApiProperty({ enum: DeviceStatus })
	public status?: string;

	@ApiProperty({
		enum: [GatewayDevice.name, SensorDevice.name],
	})
	public type?: string;

	@ApiProperty({
		required: false,
		example: 10.762622,
	})
	public lat?: number;

	@ApiProperty({
		required: false,
		example: 106.660172,
	})
	public lon?: number;

	@ApiProperty({
		required: false,
		example: 'abc123',
	})
	public device_id?: string;

	@ApiProperty({
		required: false,
		example: 'gateway123',
	})
	public gateway_id?: string;

	@ApiProperty({ required: false })
	public user?: UserModel;
}
