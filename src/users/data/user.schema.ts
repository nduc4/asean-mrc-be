import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/bases/schema';
import { UserRole } from '../../common/enums/role.enum';

@Schema({
	timestamps: true,
})
export class User extends BaseSchema {
	@Prop({ type: String, required: true })
	phone: string;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: String, required: true })
	fullName: string;

	@Prop({ type: String, required: false })
	address?: string;

	@Prop({
		type: String,
		required: true,
		default: UserRole.USER,
	})
	role?: UserRole;

	@Prop({
		type: [String],
		required: false,
	})
	token?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
