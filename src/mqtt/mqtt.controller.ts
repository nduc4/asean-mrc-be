import { Body, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { ForecastDto } from './dto/forecast.dto';

@ApiController('forecast')
export class MqttController {
	constructor(private readonly mqttService: MqttService) {}

	@MessagePattern('#')
	async subscribe(@Payload() data) {
		await this.mqttService.receive(data);
	}

	@Post('/')
	@Note({
		title: 'Dự báo sớm',
		isInput: true,
		isPublic: true,
	})
	async forecast(@Body() dto: ForecastDto) {
		return await this.mqttService.forecast(dto);
	}

	@Post('send')
	async sendNotification(
		@Body('token') token: string,
		@Body('title') title: string,
		@Body('body') body: string,
	) {
		return await this.mqttService.sendUserNotification(token, title, body);
	}
}
