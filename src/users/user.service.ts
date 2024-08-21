import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserRepo } from './data/user.repo';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { User } from './data/user.schema';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { UserRole } from 'src/common/enums/role.enum';
import { StringUtil } from 'src/common/utils/string.utils';

@Injectable()
export class UserService {
	constructor(private readonly _userRepo: UserRepo) {}

	async getAllUser(dto: PageAbleDto) {
		return await this._userRepo.getAllUser(dto);
	}

	async getOneUser(req): Promise<User> {
		return await this._userRepo.getOne({ phone: req.user.phone });
	}

	async updateUserInfo(dto: UserUpdateInfoDto, req): Promise<User> {
		if (dto.password) {
			dto.password = await this._userRepo.changePassword(dto.password);
		}
		await this._userRepo.updateById(req.user.sub, dto);
		return await this.getOneUser(req);
	}

	async deleteOneUser(dto: ObjectIdDto) {
		return await this._userRepo.deleteById(dto.id);
	}

	async addToken(userId: string, token: string): Promise<User> {
		const user = await this._userRepo.getById(userId);
		if (!user) {
		  throw new NotFoundException('User not found');
		}
		// Kiểm tra nếu token đã tồn tại trong mảng
		if (!user.token.includes(token)) {
		  user.token.push(token);
		}
		await this._userRepo.updateById(userId, user)
		return user;
	  }

	  async removeToken(userId: string, token: string): Promise<User> {
		const user = await this._userRepo.getById(userId);
		if (!user) {
		  throw new NotFoundException('User not found');
		}
		// Xóa token khỏi mảng
		user.token = user.token.filter(t => t !== token);
		await this._userRepo.updateById(userId, user)
		return user;
	  }
}

@Injectable()
export class UserSeedService implements OnModuleInit {
	constructor(private readonly _userRepo: UserRepo) {}

	async onModuleInit() {
		await this.seedUser();
	}

	private async seedUser() {
		const userCount = await this._userRepo.count();
		if (userCount === 0) {
			const users: User = {
				fullName: 'Trần Đình Phúc Đức',
				phone: '0816123456',
				role: UserRole.ADMIN,
				password: StringUtil.hashPassword(process.env.ADMIN_PASSWORD),
			};
			await this._userRepo.create(users);
		}
	}
}
