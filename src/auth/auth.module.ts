import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('JWT_TOKEN'),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
	controllers: [AuthController],
})
export class AuthModule {}
