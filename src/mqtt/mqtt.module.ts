import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'MQTT_SERVICE',
				transport: Transport.MQTT,
				options: {
					url: 'mqtt://localhost:1883',
				},
			},
		]),
	],
	controllers: [MqttController],
	providers: [MqttService],
	// providers: [MqttService],
	// exports: [MqttService],
})
export class MqttModule {}
