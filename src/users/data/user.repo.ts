import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from 'src/common/bases/repo';
import { User } from './user.schema';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { StringUtil } from 'src/common/utils/string.utils';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

export class UserRepo extends BaseRepo<User> {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {
		super(userModel);
	}

	async signUp(dto: SignUpDto): Promise<User> {
		const userIsExist = await this.findUser(dto);

		if (userIsExist) {
			throw new ConflictException('Số điện thoại đã tồn tại');
		}

		const hashedPassword = StringUtil.hashPassword(dto.password);
		dto.password = hashedPassword;
		return await this.create(dto);
	}

	async signIn(dto: SignInDto, jwtService) {
		const user = await this.findUser(dto);

		if (!user || !StringUtil.comparePassword(dto.password, user.password)) {
			throw new UnauthorizedException('Sai số điện thoại hoặc mật khẩu');
		}

		const payload = {
			sub: user._id,
			phone: user.phone,
			fullName: user.fullName,
			role: user.role,
		};

		return {
			access_token: await jwtService.signAsync(payload),
			role: user.role,
		};
	}

	async findUser(dto): Promise<User> {
		return await this.getOne({ phone: dto.phone });
	}

	async getAllUser(dto: PageAbleDto) {
		const query = {};

		if (dto.query) {
			query['$or'] = [
				{ phone: StringUtil.queryLike(dto.query) },
				{ fullName: StringUtil.queryLike(dto.query) },
				{ address: StringUtil.queryLike(dto.query) },
			];
		}

		const totalDocuments = await this.count(query);
		const totalPages = Math.ceil(totalDocuments / dto.limit);
		const data = await this.getPage(dto, query);

		return {
			totalPages,
			totalDocuments,
			data,
		};
	}

	async changePassword(newPassword: string) {
		return StringUtil.hashPassword(newPassword);
	}
}
