import { Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserModel } from 'src/users/data/user.model';

@ApiController('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signin')
	@Public()
	@Note({
		title: 'Đăng nhập',
		isPublic: true,
		isInput: true,
	})
	@ApiOkResponse({
		description: 'OK',
		schema: {
			example: {
				access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
				role: 'USER',
			},
		},
	})
	async signIn(@Body() dto: SignInDto) {
		return await this.authService.signIn(dto);
	}

	@Post('signup')
	@Public()
	@Note({
		title: 'Đăng ký',
		isPublic: true,
		isInput: true,
	})
	@ApiOkResponse({
		description: 'OK',
		type: UserModel,
	})
	@ApiConflictResponse({ description: 'Số điện thoại đã tồn tại' })
	async signUp(@Body() dto: SignUpDto) {
		return await this.authService.signUp(dto);
	}
}
