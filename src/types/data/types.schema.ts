import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/bases/schema';

@Schema({
	timestamps: true,
})
export class Type extends BaseSchema {
	@Prop({ type: Number, required: true })
	code: number;

	@Prop({ type: String, required: true })
	description: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
