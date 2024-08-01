import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	ValidateNested,
} from 'class-validator';
import { DeviceStatus } from 'src/common/enums/deviceStatus.enum';
import { User } from 'src/users/data/user.schema';

export class CreateDeviceDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	@ApiProperty({ example: 'Cổng vào hoặc cảm biến lượng mưa' })
	name: string;

	@IsEnum(DeviceStatus)
	@IsOptional()
	@ApiProperty({
		example: DeviceStatus.ACTIVE,
		description: 'Device status',
		required: false,
	})
	status?: string;

	@IsDate()
	@IsOptional()
	@ApiProperty({
		example: '2024-07-29T04:26:57.038Z',
		description: 'Ngày sản xuất',
		required: false,
	})
	manufacturingDate?: Date;

	user?: User;
}

export class CreateGatewayDeviceDto extends CreateDeviceDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 10.762622,
		description: 'Vĩ độ',
	})
	lat: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 106.660172,
		description: 'Kinh độ',
	})
	lon: number;
}

export class CreateSensorDeviceDto extends CreateDeviceDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'abc123' })
	device_id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'gateway123' })
	gateway_id: string;
}

@ApiExtraModels(CreateGatewayDeviceDto, CreateSensorDeviceDto)
export class CreateDeviceUnionDto {
	@ValidateNested()
	@Type(() => CreateGatewayDeviceDto)
	@ApiProperty({ required: false })
	gatewayDevice?: CreateGatewayDeviceDto;

	@ValidateNested()
	@Type(() => CreateSensorDeviceDto)
	@ApiProperty({ required: false })
	sensorDevice?: CreateSensorDeviceDto;
}
