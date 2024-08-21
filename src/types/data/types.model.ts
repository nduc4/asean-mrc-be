import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/bases/model';

export class TypeModel extends BaseModel {
	@ApiProperty({ example: 1 })
	public code: number;

	@ApiProperty({
		example: 'Restart gateway',
	})
	public description: string;
}
