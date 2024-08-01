import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {
	public static readonly title = 'NestJS';
	public static readonly description = 'NestJS API';
	public static readonly version = '1.0';
	public static readonly path = 'docs';

	public static setup(app: INestApplication, path: string = Swagger.path) {
		const options = new DocumentBuilder()
			.setTitle(Swagger.title)
			.setDescription(Swagger.description)
			.setVersion(Swagger.version)
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup(path, app, document);
	}
}
