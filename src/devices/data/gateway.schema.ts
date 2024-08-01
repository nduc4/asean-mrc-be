import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/data/user.schema';
import { BaseSchema } from 'src/common/bases/schema';

@Schema()
export class GatewayDevice extends BaseSchema {
	name: string;
	status?: string;
	manufacturingDate?: Date;
	type?: string;
	user?: User;

	@Prop({ type: Number, required: true })
	lat?: number;

	@Prop({ type: Number, required: true })
	lon?: number;
}

export const GatewayDeviceSchema = SchemaFactory.createForClass(GatewayDevice);
