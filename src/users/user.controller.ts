import {
	Body,
	Delete,
	Get,
	Param,
	Patch,
	Put,
	Query,
	Req,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { UserRole } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UserModel } from './data/user.model';
import { User } from './data/user.schema';

@ApiController('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('/')
	@Roles(UserRole.ADMIN)
	@Note({
		title: 'Lấy tất cả user (ADMIN)',
		isInput: true,
		isForbidden: true,
	})
	@ApiOkResponse({
		description: 'OK',
		schema: {
			example: {
				totalPages: 1,
				totalDocuments: 10,
				data: [],
			},
		},
	})
	async getAll(@Query() dto: PageAbleDto) {
		return await this.userService.getAllUser(dto);
	}

	@Get('profile')
	@Note({ title: 'Lấy thông tin cá nhân' })
	@ApiOkResponse({
		description: 'OK',
		type: UserModel,
	})
	async getProfile(@Req() req) {
		return await this.userService.getOneUser(req);
	}

	@Put('/')
	@Note({
		title: 'Cập nhật thông tin user',
		isInput: true,
	})
	@ApiOkResponse({
		description: 'OK',
		type: UserModel,
	})
	async updateInfo(@Body() dto: UserUpdateInfoDto, @Req() req) {
		return await this.userService.updateUserInfo(dto, req);
	}

	@Delete('/:id')
	@Roles(UserRole.ADMIN)
	@Note({
		title: 'Xóa user (ADMIN)',
		isInput: true,
		isForbidden: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của user cần xóa',
		type: String,
	})
	@ApiOkResponse({
		description: 'OK',
		type: UserModel,
	})
	async deleteUser(@Param() dto: ObjectIdDto) {
		return await this.userService.deleteOneUser(dto);
	}

	@Patch(':id/add-token')
	@Note({
		title: 'Thêm FCM token cho user',
		isInput: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của user cần thêm FCM token',
		type: String,
	})
	@ApiBody({
		required: true,
		type: String,
		description: 'Token FCM',
		schema: {
			type: 'object',
			properties: {
				token: {
					type: 'string',
					description: 'Token FCM cần thêm cho user',
					example: 'dflJsoi48JdOiwje2DfS',
				},
			},
		},
	})
	async addToken(@Param('id') userId: string, @Body('token') token: string) {
		return this.userService.addToken(userId, token);
	}

	@Patch(':id/remove-token')
	@Note({
		title: 'Xóa FCM token cho user',
		isInput: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của user cần xóa FCM token',
		type: String,
	})
	@ApiBody({
		required: true,
		type: String,
		description: 'Token FCM',
		schema: {
			type: 'object',
			properties: {
				token: {
					type: 'string',
					description: 'Token FCM cần xóa',
					example: 'dflJsoi48JdOiwje2DfS',
				},
			},
		},
	})
	async removeToken(
		@Param('id') userId: string,
		@Body('token') token: string,
	) {
		return this.userService.removeToken(userId, token);
	}
}
