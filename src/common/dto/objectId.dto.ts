import { Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class ObjectIdDto {
	@Type(() => String)
	@IsMongoId()
	public id: string;
}
