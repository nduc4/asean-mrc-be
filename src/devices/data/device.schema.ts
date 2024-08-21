import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema';
import { User } from 'src/users/data/user.schema';
import { GatewayDevice } from './gateway.schema';
import { SensorDevice } from './sensor.schema';

@Schema({
	timestamps: true,
	discriminatorKey: 'type',
})
export class Device extends BaseSchema {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({
		type: Boolean,
		required: true,
		default: true,
	})
	isActive: boolean;

	@Prop({ type: Date, required: false })
	manufacturingDate?: Date;

	@Prop({
		enum: [GatewayDevice.name, SensorDevice.name],
		required: true,
	})
	type?: string;

	@Prop({
		type: mongoose.Types.ObjectId,
		required: false,
		ref: User.name,
		autopopulate: true,
	})
	user?: User;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
