import { Controller, Get } from '@nestjs/common';
import {
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Controller()
export class MqttController {
	constructor(private readonly mqttService: MqttService) {}

	// Cập nhật trạng thái thiết bị (nhận về)
	@MessagePattern('devices/status')
	async updateDeviceStatus(@Payload() data: string, @Ctx() context: MqttContext) {
		console.log(`Received ping message on topic 'devices/status': ${data}`);
		console.log(`Topic: ${context.getTopic()}`);
	}

	// Tạo thiết bị tự động (nhận về)
	@MessagePattern('devices/create')
	async createDevices(@Payload() data: string, @Ctx() context: MqttContext) {
		return await this.mqttService.createDevices(data, context)
	}

	// Cảnh báo đột ngột (nhận về), cập nhật firebase
	@MessagePattern('warning')
	async warning(@Payload() data: string) {
		return await this.mqttService.updateFirebase(data)
	}

	// Dự báo (v1: mã khu vực, v2: mã khu vực và mực nước (đều lấy từ gateway), 2 tiếng gọi 1 lần)
	@Get('/')
	async forecast(lat, lon) {
		return await this.mqttService.forecast(lat, lon);
	}
}
