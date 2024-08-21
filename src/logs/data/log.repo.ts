import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/common/bases/repo';
import { Log } from './log.schema';
import { Model } from 'mongoose';

export class LogRepo extends BaseRepo<Log> {
	constructor(
		@InjectModel(Log.name)
		private readonly LogModel: Model<Log>,
	) {
		super(LogModel);
	}
}
