import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { UserRepo } from 'src/users/data/user.repo';
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/users/data/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private _userRepo: UserRepo,
		private readonly jwtService: JwtService,
	) {}

	async signIn(dto: SignInDto) {
		return this._userRepo.signIn(dto, this.jwtService);
	}

	async signUp(dto: SignUpDto): Promise<User> {
		return this._userRepo.signUp(dto);
	}
}
