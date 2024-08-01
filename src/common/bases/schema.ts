import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
	timestamps: true,
})
export class BaseSchema {
	@Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
	_id?: mongoose.Types.ObjectId;

	@Prop({ type: Date, required: false })
	createdAt?: Date;

	@Prop({ type: Date, required: false })
	updatedAt?: Date;
}
