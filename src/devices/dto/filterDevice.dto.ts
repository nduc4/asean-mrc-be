import { ApiProperty } from '@nestjs/swagger';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { GatewayDevice } from '../data/gateway.schema';
import { SensorDevice } from '../data/sensor.schema';
import { DeviceStatus } from 'src/common/enums/deviceStatus.enum';
import {
	IsDate,
	IsEnum,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	Length,
} from 'class-validator';

export class FilterDeviceDto extends PageAbleDto {
	@IsEnum(DeviceStatus)
	@IsOptional()
	@ApiProperty({
		required: false,
		enum: DeviceStatus,
	})
	status?: string;

	@IsDate()
	@IsOptional()
	@ApiProperty({
		description: 'Ngày bắt đầu (lọc theo ngày sản xuất)',
		required: false,
	})
	fromManufacturingDate?: Date;

	@IsDate()
	@IsOptional()
	@ApiProperty({
		description: 'Ngày kết thúc (lọc theo ngày sản xuất)',
		required: false,
	})
	toManufacturingDate?: Date;

	@IsEnum([GatewayDevice.name, SensorDevice.name])
	@IsOptional()
	@ApiProperty({
		description: 'Loại thiết bị',
		enum: [GatewayDevice.name, SensorDevice.name],
		required: false,
	})
	type?: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: 'Vĩ độ',
		required: false,
	})
	lat?: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: 'Kinh độ',
		required: false,
	})
	lon?: number;

	@IsString()
	@Length(1, 100)
	@IsOptional()
	@ApiProperty({
		required: false,
	})
	device_id?: string;

	@IsMongoId()
	@IsOptional()
	@ApiProperty({
		description: 'ID của User (ADMIN)',
		required: false,
	})
	userId?: string;
}
