import { IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
	@IsPhoneNumber('VN')
	@ApiProperty({ example: '0816123456' })
	phone: string;

	@IsString()
	@Length(6, 50)
	@ApiProperty({ example: 'thisisapassword' })
	password: string;
}
