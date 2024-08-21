import { ApiProperty } from '@nestjs/swagger';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { GatewayDevice } from '../data/gateway.schema';
import { SensorDevice } from '../data/sensor.schema';
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDeviceDto extends PageAbleDto {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		required: false,
		description: 'Trạng thái hoạt động',
	})
	isActive?: boolean;

	@IsDate()
	@IsOptional()
	@Type(() => Date)
	@ApiProperty({
		description: 'Ngày bắt đầu (lọc theo ngày sản xuất)',
		required: false,
	})
	fromManufacturingDate?: Date;

	@IsDate()
	@IsOptional()
	@Type(() => Date)
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
	@Type(() => Number)
	@ApiProperty({
		description: 'Vĩ độ',
		required: false,
	})
	lat?: number;

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
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
		description: 'ID của thiết bị Sensor',
	})
	device_id?: string;

	@IsString()
	@Length(1, 100)
	@IsOptional()
	@ApiProperty({
		required: false,
		description: 'Địa chỉ MAC của thiết bị Gateway',
	})
	macAddress?: string;

	@IsMongoId()
	@IsOptional()
	@ApiProperty({
		description: 'ID của User (ADMIN)',
		required: false,
	})
	userId?: string;
}
