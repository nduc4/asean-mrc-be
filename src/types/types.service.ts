import { Injectable, OnModuleInit } from '@nestjs/common';
import { TypeRepo } from './data/types.repo';

@Injectable()
export class TypeSeedService implements OnModuleInit {
	constructor(private readonly _typeRepo: TypeRepo) {}

	async onModuleInit() {
		await this.seedTypes();
	}

	private async seedTypes() {
		const typesCount = await this._typeRepo.count();
		if (typesCount === 0) {
			const types = [
				{ code: 0, description: 'restart' },
				{ code: 1, description: 'startup' },
				{ code: 2, description: 'report' },
				{ code: 4, description: 'warning' },
			];
			await this._typeRepo.createMany(types);
		}
	}
}
