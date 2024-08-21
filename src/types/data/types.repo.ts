import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/common/bases/repo';
import { Type } from './types.schema';
import { Model } from 'mongoose';

export class TypeRepo extends BaseRepo<Type> {
	constructor(
		@InjectModel(Type.name)
		private readonly TypeModel: Model<Type>,
	) {
		super(TypeModel);
	}
}
