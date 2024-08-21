import { Injectable } from '@nestjs/common';
import { DeviceRepo } from './data/device.repo';
import { StringUtil } from 'src/common/utils/string.utils';
import { UserRole } from 'src/common/enums/role.enum';
import { Types } from 'mongoose';
import { UpdateDeviceUnionDto } from './dto/updateDevice.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { FilterDeviceDto } from './dto/filterDevice.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DeviceService {
	constructor(private readonly _deviceRepo: DeviceRepo) {}

	async getAllDevice(dto: FilterDeviceDto, req) {
		const userRole = req.user.role;
		const userId: string = req.user.sub;
		const query: any = {};

		this.applyTextFilters(query, dto);
		this.applyDateFilters(query, dto);
		this.applyLocationFilters(query, dto);

		this.applyUserFilter(query, userRole, userId, dto);

		const totalDocuments = await this._deviceRepo.count(query);
		const totalPages = Math.ceil(totalDocuments / dto.limit);
		const data = await this._deviceRepo.getPage(dto, query);

		return {
			totalPages,
			totalDocuments,
			data,
		};
	}

	private applyTextFilters(query: any, dto: FilterDeviceDto) {
		if (dto.query) {
			query['query'] = StringUtil.queryLike(dto.query);
		}
		if (dto.isActive) {
			query['isActive'] = StringUtil.queryLike(dto.isActive.toString());
		}
		if (dto.macAddress) {
			query['macAddress'] = StringUtil.queryLike(dto.macAddress);
		}
		if (dto.type) {
			query['type'] = StringUtil.queryLike(dto.type);
		}
		if (dto.device_id) {
			query['device_id'] = StringUtil.queryLike(dto.device_id);
		}
	}

	private applyDateFilters(query: any, dto: FilterDeviceDto) {
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
	}

	private applyLocationFilters(query: any, dto: FilterDeviceDto) {
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
	}

	private applyUserFilter(
		query: any,
		userRole: UserRole,
		userId: string,
		dto: FilterDeviceDto,
	) {
		if (userRole === UserRole.USER) {
			query['user'] = new Types.ObjectId(userId);
		} else if (dto.userId && userRole === UserRole.ADMIN) {
			query['user'] = new Types.ObjectId(dto.userId);
		}
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

	@Cron(CronExpression.EVERY_10_SECONDS)
	async updateInactiveDevices() {
		const devices = await this._deviceRepo.getAll({ isActive: true });

		const now = new Date();
		const fifteenSecondsAgo = new Date(now.getTime() - 15 * 1000);

		for (const device of devices) {
			if (device.updatedAt && device.updatedAt < fifteenSecondsAgo) {
				await this._deviceRepo.updateById(device._id.toString(), {
					isActive: false,
				});
			}
		}
	}
}
