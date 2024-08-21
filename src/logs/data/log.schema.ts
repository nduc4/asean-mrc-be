import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema';
import { Device } from 'src/devices/data/device.schema';
import { Type } from 'src/types/data/types.schema';

@Schema({
	timestamps: true,
})
export class Log extends BaseSchema {
	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		ref: Type.name,
		autopopulate: true,
	})
	type: Type;

	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		ref: Device.name,
		autopopulate: true,
	})
	device: Device;

	@Prop({ type: String, required: false })
	description?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
