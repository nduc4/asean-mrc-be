import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/data/user.schema';
import { BaseSchema } from 'src/common/bases/schema';

@Schema()
export class GatewayDevice extends BaseSchema {
	name: string;
	isActive?: boolean;
	manufacturingDate?: Date;
	type?: string;
	user?: User;

	@Prop({ type: Number, required: true })
	lat: number;

	@Prop({ type: Number, required: true })
	lon: number;

	@Prop({ type: String, required: true })
	macAddress: string;

	@Prop({ type: String, required: true })
	pub: string;

	@Prop({ type: String, required: true })
	sub: string;
}

export const GatewayDeviceSchema = SchemaFactory.createForClass(GatewayDevice);
