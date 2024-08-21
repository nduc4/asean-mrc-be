import { Module } from '@nestjs/common';
import { TypeSeedService } from './types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from './data/types.schema';
import { TypeRepo } from './data/types.repo';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
	],
	providers: [TypeSeedService, TypeRepo],
})
export class TypeModule {}
