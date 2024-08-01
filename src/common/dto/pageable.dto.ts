import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PageAbleDto {
	@Type(() => Number)
	@IsNumber()
	@ApiProperty({ default: 1 })
	page: number = 1;

	@Type(() => Number)
	@IsNumber()
	@ApiProperty({ default: 10 })
	limit: number = 10;

	@Type(() => String)
	@IsString()
	@ApiProperty({ default: '', required: false })
	@IsOptional()
	query?: string = '';
}
