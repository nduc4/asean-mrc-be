import { ApiProperty } from '@nestjs/swagger';
import { SignInDto } from './signIn.dto';
import { IsString, Length } from 'class-validator';

export class SignUpDto extends SignInDto {
	@IsString()
	@Length(2, 100)
	@ApiProperty({ example: 'thisisafullname' })
	fullName: string;

	@IsString()
	@Length(1, 255)
	@ApiProperty({
		example:
			'Số 10, Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa - Tỉnh Đồng Nai',
		required: false,
	})
	address?: string;
}
