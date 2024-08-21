import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/bases/schema';
import { User } from 'src/users/data/user.schema';

@Schema()
export class SensorDevice extends BaseSchema {
	name: string;
	isActive?: boolean;
	manufacturingDate?: Date;
	type?: string;
	user?: User;

	@Prop({ type: String, required: true })
	device_id: string;
}

export const SensorDeviceSchema = SchemaFactory.createForClass(SensorDevice);
