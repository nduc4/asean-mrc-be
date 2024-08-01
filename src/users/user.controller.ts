import { Body, Delete, Get, Param, Put, Query, Req } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { UserRole } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UserModel } from './data/user.model';

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
}
