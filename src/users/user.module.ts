import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './data/user.schema';
import { UserRepo } from './data/user.repo';
import { UserController } from './user.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	providers: [UserService, UserRepo],
	controllers: [UserController],
	exports: [UserService, UserRepo],
})
export class UserModule {}
