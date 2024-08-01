import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepo } from 'src/users/data/user.repo';
import {
	DeviceRepo,
	GatewayDeviceRepo,
	SensorDeviceRepo,
} from './data/device.repo';
import { CreateDeviceUnionDto } from './dto/createDevice.dto';
import { StringUtil } from 'src/common/utils/string.utils';
import { UserRole } from 'src/common/enums/role.enum';
import { Types } from 'mongoose';
import { UpdateDeviceUnionDto } from './dto/updateDevice.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { FilterDeviceDto } from './dto/filterDevice.dto';

@Injectable()
export class DeviceService {
	constructor(
		private readonly _deviceRepo: DeviceRepo,
		private readonly _gatewayDeviceRepo: GatewayDeviceRepo,
		private readonly _sensorDeviceRepo: SensorDeviceRepo,
		private readonly _userRepo: UserRepo,
	) {}

	async createDevice(dto: CreateDeviceUnionDto, req) {
		const user = await this._userRepo.getOne({ _id: req.user.sub });

		if (!user) {
			throw new NotFoundException('Không tìm thấy người dùng');
		}

		let device;

		if (dto.gatewayDevice) {
			dto.gatewayDevice.user = user;
			device = await this._gatewayDeviceRepo.create(dto.gatewayDevice);
		} else {
			dto.sensorDevice.user = user;
			device = await this._sensorDeviceRepo.create(dto.sensorDevice);
		}

		return device.save();
	}

	async getAllDevice(dto: FilterDeviceDto, req) {
		const userRole = req.user.role;
		const userId: string = req.user.sub;
		const query: any = {};

		if (dto.query) {
			query['query'] = StringUtil.queryLike(dto.query);
		}

		if (dto.status) {
			query['status'] = StringUtil.queryLike(dto.status);
		}

		if (dto.type) {
			query['type'] = StringUtil.queryLike(dto.type);
		}

		if (dto.device_id) {
			query['device_id'] = StringUtil.queryLike(dto.device_id);
		}

		if (dto.fromManufacturingDate || dto.toManufacturingDate) {
			query['manufacturingDate'] = {};
			if (dto.fromManufacturingDate) {
				query['manufacturingDate']['$gte'] = new Date(
					dto.fromManufacturingDate,
				);
			}
			if (dto.toManufacturingDate) {
				query['manufacturingDate']['$lte'] = new Date(
					dto.toManufacturingDate,
				);
			}
		}

		const margin: number = 0.01;

		if (dto.lat) {
			const lat = Number(dto.lat);
			query['lat'] = {
				$gte: lat - margin,
				$lte: lat + margin,
			};
		}

		if (dto.lon) {
			const lon = Number(dto.lon);
			query['lon'] = {
				$gte: lon - margin,
				$lte: lon + margin,
			};
		}

		if (userRole === UserRole.USER) {
			query['user'] = new Types.ObjectId(userId);
		} else if (dto.userId && userRole === UserRole.ADMIN) {
			query['user'] = new Types.ObjectId(dto.userId);
		}

		const totalDocuments = await this._deviceRepo.count(query);
		const totalPages = Math.ceil(totalDocuments / dto.limit);
		const data = await this._deviceRepo.getPage(dto, query);

		return {
			totalPages,
			totalDocuments,
			data,
		};
	}

	async getDeviceById(idDto: ObjectIdDto) {
		return await this._deviceRepo.getById(idDto.id);
	}

	async updateDeviceById(idDto: ObjectIdDto, dto: UpdateDeviceUnionDto) {
		if (dto.gatewayDevice) {
			await this._deviceRepo.updateById(idDto.id, dto.gatewayDevice);
		} else {
			await this._deviceRepo.updateById(idDto.id, dto.sensorDevice);
		}
		return await this.getDeviceById(idDto);
	}

	async deleteDevice(idDto: ObjectIdDto) {
		return await this._deviceRepo.deleteById(idDto.id);
	}
}
