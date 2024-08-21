import { ApiController } from 'src/common/decorators/apiController.decorator';
import { LogService } from './log.service';
import { Get, Param, Query, Req } from '@nestjs/common';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { Log } from './data/log.schema';

@ApiController('logs')
export class LogController {
	constructor(private readonly logService: LogService) {}

	@Get('/:id')
	@Note({
		title: 'Xem log gateway',
		isInput: true,
		isForbidden: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của gateway',
		type: String,
	})
	async getAllLog(@Param() idDto: ObjectIdDto) {
		return this.logService.getAllLog(idDto);
	}
}
