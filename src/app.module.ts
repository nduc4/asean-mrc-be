import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './common/env.validation';
import * as path from 'path';
import { DeviceModule } from './devices/device.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
			envFilePath: path.resolve(
				process.cwd(),
				`.env.${process.env.NODE_ENV || 'development'}`,
			),
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
			}),
			inject: [ConfigService],
		}),
		AuthModule,
		UserModule,
		DeviceModule,
	],
})
export class AppModule {}
