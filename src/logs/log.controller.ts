import { ApiController } from 'src/common/decorators/apiController.decorator';
import { LogService } from './log.service';
import { Body, Get, Param, Post } from '@nestjs/common';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiParam } from '@nestjs/swagger';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';

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
		return await this.logService.getAllLog(idDto);
	}

	@Post()
	@Note({
		title: 'Ghi log',
		isInput: true,
	})
	async createLog(
		@Body('code') code: number,
		@Body('id') id: string,
		@Body('content') content: string
	) {
		return await this.logService.createLogHttp(code, id, content)
	}
}
