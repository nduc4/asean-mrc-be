import { ApiController } from 'src/common/decorators/apiController.decorator';
import { DeviceService } from './device.service';
import { Body, Delete, Get, Param, Put, Query, Req } from '@nestjs/common';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { DeviceModel } from './data/device.model';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { UpdateDeviceUnionDto } from './dto/updateDevice.dto';
import { FilterDeviceDto } from './dto/filterDevice.dto';

@ApiController('devices')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	// @Post('/')
	// @Note({
	// 	title: 'Tạo/Thêm thiết bị',
	// 	isInput: true,
	// })
	// @ApiOkResponse({
	// 	description: 'OK',
	// 	type: DeviceModel,
	// })
	// async createDevice(@Body() dto: CreateDeviceUnionDto, @Req() req) {
	// 	return await this.deviceService.createDevice(dto, req);
	// }

	@Get('/')
	@Note({
		title: 'Lấy tất cả thiết bị',
		isInput: true,
	})
	@ApiOkResponse({
		description: 'OK',
		schema: {
			example: {
				totalPages: 1,
				totalDocuments: 10,
				data: [],
			},
		},
	})
	async getAllDevice(@Query() dto: FilterDeviceDto, @Req() req) {
		return await this.deviceService.getAllDevice(dto, req);
	}

	@Get('/:id')
	@Note({
		title: 'Lấy một thiết bị',
		isInput: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của thiết bị cần lấy',
		type: String,
	})
	@ApiOkResponse({
		description: 'OK',
		type: DeviceModel,
	})
	async getDeviceById(@Param() idDto: ObjectIdDto) {
		return await this.deviceService.getDeviceById(idDto);
	}

	@Put('/:id')
	@Note({
		title: 'Cập nhật thông tin thiết bị',
		isInput: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của thiết bị cần sửa',
		type: String,
	})
	@ApiOkResponse({
		description: 'OK',
		type: DeviceModel,
	})
	async updateDevice(
		@Param() idDto: ObjectIdDto,
		@Body() dto: UpdateDeviceUnionDto,
	) {
		return await this.deviceService.updateDeviceById(idDto, dto);
	}

	@Delete('/:id')
	@Note({
		title: 'Xóa thiết bị',
		isInput: true,
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID của thiết bị cần xóa',
		type: String,
	})
	@ApiOkResponse({
		description: 'OK',
		type: DeviceModel,
	})
	async deleteDevice(@Param() idDto: ObjectIdDto) {
		return await this.deviceService.deleteDevice(idDto);
	}
}
