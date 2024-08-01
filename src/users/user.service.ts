import { Injectable } from '@nestjs/common';
import { UserRepo } from './data/user.repo';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { User } from './data/user.schema';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';

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
}
