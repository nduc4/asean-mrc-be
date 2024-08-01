import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Request } from 'express';

export class StringUtil {
	private static readonly saltRounds = 10;

	public static hashPassword(password: string): string {
		return bcrypt.hashSync(password, StringUtil.saltRounds);
	}

	public static comparePassword(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}

	public static generateRandomString(length: number): string {
		let result = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}
		return result;
	}

	public static queryLike(query: string): Object {
		return { $regex: query, $options: 'i' };
	}

	public static genObjectId(): mongoose.Types.ObjectId {
		return new mongoose.Types.ObjectId();
	}

	public static toObjectId(id: string): mongoose.Types.ObjectId {
		return new mongoose.Types.ObjectId(id);
	}

	public static extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}

	public static generateOrderCode(): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}
		return result;
	}

	public static toVnd(value: number): string {
		return value.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
	}

	public static covertToBase64(file: Express.Multer.File): string {
		return Buffer.from(file.buffer).toString('base64');
	}

	public static getNumberFromString(str: string): number {
		return Number(str.match(/\d+/g).join(''));
	}
}
