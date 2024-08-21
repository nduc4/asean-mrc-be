import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ForecastDto {
	@IsNumber()
	@Type(() => Number)
	@IsNotEmpty()
	@ApiProperty({
		required: true,
		example: 10,
		description: 'Vĩ độ',
	})
	lat: number;

	@IsNumber()
	@Type(() => Number)
	@IsNotEmpty()
	@ApiProperty({
		required: true,
		example: 100,
		description: 'Kinh độ',
	})
	lon: number;
}
