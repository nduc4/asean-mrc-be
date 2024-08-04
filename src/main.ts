import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Swagger } from './common/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const ipMqtt = configService.get('IP_MQTT')
	const portMqtt = configService.get('PORT_MQTT');
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.MQTT,
		options: {
			url: `mqtt://${ipMqtt}:${portMqtt}`,
		},
	});

	const port = configService.get('PORT');
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	Swagger.setup(app);
	app.enableCors({
		origin: '*',
	});

	await app.startAllMicroservices();
	await app.listen(port);
}
bootstrap();
