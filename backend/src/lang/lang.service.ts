import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();
@Injectable()
export class LangService {
	async getText(req: Request, key : any) {
		const text = await prisma.texts.findUnique({
			where: { key }
		});
		const lang = req?.headers?.['accept-language'];
		return lang == 'fr' ? text.fr : text.en;
	}
}
