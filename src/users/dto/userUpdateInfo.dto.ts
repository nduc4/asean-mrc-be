import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UserUpdateInfoDto {
	@IsString()
	@Length(2, 100)
	@IsOptional()
	@ApiProperty({
		example: 'Nguyễn Văn A',
		required: false,
	})
	fullName?: string;

	@IsString()
	@IsOptional()
	@Length(6, 50)
	@ApiProperty({
		example: 'thisisapassword',
		required: false,
	})
	password?: string;

	@IsString()
	@IsOptional()
	@Length(1, 255)
	@ApiProperty({
		example:
			'Số 10, Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa - Tỉnh Đồng Nai',
		required: false,
	})
	address?: string;
}
