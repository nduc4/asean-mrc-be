import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Swagger } from './common/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get('PORT');
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	Swagger.setup(app);
	app.enableCors({
		origin: '*',
	});
	await app.listen(port);
}
bootstrap();
