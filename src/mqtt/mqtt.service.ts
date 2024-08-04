import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
	constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

	async sendPing() {
		this.client.emit('server/ping', 'ping from NestJS');
		console.log('Ping sent to topic "server/ping"');
	}

	async updateFirebase(data) {
		return {}
	}

	async createDevices(data, context) {
		return {}
	}

	async updateStatusDevices(data) {
		return {}
	}

	async forecast(lat, lon) {
		return {}
	}

}
