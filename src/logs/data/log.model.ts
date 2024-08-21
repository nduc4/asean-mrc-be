import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/bases/model';
import { DeviceModel } from 'src/devices/data/device.model';
import { TypeModel } from 'src/types/data/types.model';

export class LogModel extends BaseModel {
	@ApiProperty({ required: true })
	public type: TypeModel;

	@ApiProperty({ required: true })
	public device: DeviceModel;

	@ApiProperty({ required: false })
	public description?: string;
}
