import { Model } from 'mongoose';
import { StringUtil } from '../utils/string.utils';
import { BaseSchema } from './schema';

export abstract class BaseRepo<T extends BaseSchema> implements IBaseRepo<T> {
	protected model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}

	public getAll(query: Like<T> = {}, sort?: SortQuery): Promise<T[]> {
		let queryObj = this.model.find(query);
		if (sort) {
			queryObj = queryObj.sort(sort);
		}
		return queryObj.exec();
	}

	getOne(query: Like<T>): Promise<T> {
		return this.model.findOne(query).exec();
	}

	getById(id: string): Promise<T> {
		return this.model.findById(id).exec();
	}

	create(data: T): Promise<T> {
		data._id = StringUtil.genObjectId();
		return this.model.create(data);
	}

	createMany(data: T[]): Promise<T[]> {
		data.forEach((item) => {
			item._id = StringUtil.genObjectId();
		});
		return this.model.insertMany(data);
	}

	update(query: Like<T>, data: Partial<T>): Promise<T> {
		return this.model.findOneAndUpdate(query, data).exec();
	}

	updateMany(query: Like<T>, data: T): void {
		this.model.updateMany(query, data).exec();
	}

	updateById(id: string, data: Partial<T>): Promise<T> {
		return this.model.findByIdAndUpdate(id, data).exec();
	}

	delete(query: Like<T>): Promise<T> {
		return this.model.findOneAndDelete(query).exec();
	}

	deleteMany(query: Like<T>): void {
		this.model.deleteMany(query).exec();
	}

	deleteById(id: string): Promise<T> {
		return this.model.findByIdAndDelete(id).exec();
	}

	deleteByIds(ids: string[]): void {
		this.model.deleteMany({ _id: { $in: ids } }).exec();
	}

	async getPage(
		page: PageQuery,
		query: Like<T> = {},
		sort?: SortQuery,
	): Promise<T[]> {
		let queryObj = this.model.find(query);
		if (sort) {
			queryObj = queryObj.sort(sort);
		}
		queryObj = queryObj
			.skip((page.page - 1) * page.limit)
			.limit(page.limit);
		return queryObj.exec();
	}

	count(query: Like<T> = {}): Promise<number> {
		return this.model.countDocuments(query).exec();
	}
}

type Like<T> = { [P in keyof T]?: T[P] };
type PageQuery = { page: number; limit: number };
type SortQuery = { [key: string]: 1 | -1 };

interface IBaseRepo<T extends BaseSchema> {
	getAll(): Promise<T[]>;
	getAll(query: Like<T>): Promise<T[]>;
	getAll(query: Like<T>, sort: SortQuery): Promise<T[]>;

	getOne(query: Like<T>): Promise<T>;
	getById(id: string): Promise<T>;

	create(data: T): Promise<T>;
	createMany(data: T[]): Promise<T[]>;

	update(query: Like<T>, data: T): Promise<T>;
	updateMany(query: Like<T>, data: T): void;
	updateById(id: string, data: T): Promise<T>;

	delete(query: Like<T>): Promise<T>;
	deleteMany(query: Like<T>): void;
	deleteById(id: string): Promise<T>;

	getPage(page: PageQuery, query: Like<T>): Promise<T[]>;
	getPage(page: PageQuery, query: Like<T>, sort: SortQuery): Promise<T[]>;

	count(query: Like<T>): Promise<number>;
	count(): Promise<number>;
}
