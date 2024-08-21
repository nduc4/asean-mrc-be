import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/bases/model';
import { UserRole } from '../../common/enums/role.enum';

export class UserModel extends BaseModel {
	@ApiProperty({ example: '0816123456' })
	public phone: string;

	@ApiProperty({ example: 'gIq7dCYtfOeXpKCw...' })
	public password: string;

	@ApiProperty({
		enum: UserRole,
		example: UserRole.USER,
	})
	public role: UserRole;

	@ApiProperty({ example: 'thisisafullname' })
	public fullName: string;

	@ApiProperty({
		example:
			'Số 10, Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa - Tỉnh Đồng Nai',
	})
	public address: string;

	@ApiProperty({
		type: [String],
		example: ['token1', 'token2', 'token3'],
		description: 'Array of FCM tokens for push notifications',
	})
	public token: string[];
}
