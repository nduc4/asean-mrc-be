import { applyDecorators } from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiOperation,
	ApiInternalServerErrorResponse,
	ApiUnauthorizedResponse,
	ApiBadRequestResponse,
	ApiForbiddenResponse,
} from '@nestjs/swagger';
import 'reflect-metadata';

export interface NoteOptions {
	title: string;
	isPublic?: boolean;
	isInput?: boolean;
	isForbidden?: boolean;
}

export function Note(options: NoteOptions) {
	const decorators = [];

	if (!options.isPublic) {
		decorators.push(
			ApiBearerAuth(),
			ApiUnauthorizedResponse({
				description: 'Unauthorized',
			}),
		);
	} else {
		decorators.push(ApiTags('Public API'));
	}

	if (options.isInput) {
		decorators.push(
			ApiBadRequestResponse({
				description: 'Bad Request',
			}),
		);
	}

	if (options.isForbidden) {
		decorators.push(
			ApiForbiddenResponse({
				description: 'Forbidden',
			}),
		);
	}

	decorators.push(
		ApiOperation({ summary: options.title }),
		ApiInternalServerErrorResponse({
			description: 'Internal Server Error',
		}),
	);

	return applyDecorators(...decorators);
}
