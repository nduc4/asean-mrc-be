import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	ValidateNested,
} from 'class-validator';
import { User } from 'src/users/data/user.schema';

export class UpdateDeviceDto {
	@IsString()
	@Length(2, 100)
	@IsOptional()
	@ApiProperty({
		example: 'Cổng vào hoặc cảm biến lượng mưa',
		required: false,
	})
	name?: string;

	@IsDate()
	@IsOptional()
	@Type(() => Date)
	@ApiProperty({
		example: '2024-07-29T04:26:57.038Z',
		description: 'Ngày sản xuất',
		required: false,
	})
	manufacturingDate?: Date;

	user?: User;
}

export class UpdateGatewayDeviceDto extends UpdateDeviceDto {
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({
		example: 10.762622,
		description: 'Vĩ độ',
		required: false,
	})
	lat?: number;

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({
		example: 106.660172,
		description: 'Kinh độ',
		required: false,
	})
	lon?: number;

	@IsString()
	@Length(1, 100)
	@IsOptional()
	@ApiProperty({
		example: 'gateway123',
		required: false,
	})
	macAddress?: string;
}

export class UpdateSensorDeviceDto extends UpdateDeviceDto {
	@IsString()
	@Length(1, 100)
	@IsOptional()
	@ApiProperty({
		example: 'abc123',
		required: false,
	})
	device_id?: string;
}

@ApiExtraModels(UpdateGatewayDeviceDto, UpdateSensorDeviceDto)
export class UpdateDeviceUnionDto {
	@ApiProperty({ required: false })
	@ValidateNested()
	@Type(() => UpdateGatewayDeviceDto)
	gatewayDevice?: UpdateGatewayDeviceDto;

	@ApiProperty({ required: false })
	@ValidateNested()
	@Type(() => UpdateSensorDeviceDto)
	sensorDevice?: UpdateSensorDeviceDto;
}
