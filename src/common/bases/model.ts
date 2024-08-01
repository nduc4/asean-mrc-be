import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from './schema';

export class BaseModel {
	@ApiProperty({ example: '60c9b0b9e0b3c2a4e0b3c2a4' })
	public id: string;

	@ApiProperty({ example: '2021-06-16T08:48:57.000Z' })
	public createdAt: Date;

	@ApiProperty({ example: '2021-06-16T08:48:57.000Z' })
	public updatedAt: Date;

	constructor(model: Partial<BaseSchema>) {
		this.id = model?._id.toString();
		this.createdAt = model?.createdAt;
		this.updatedAt = model?.updatedAt;
	}
}
