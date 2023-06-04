import { Body, ConflictException, Injectable, Param, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express'

const prisma = new PrismaClient();

@Injectable()
export class UserService {
	async getUserData(@Req() req: Request, @Param() params: any) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		if (['email', 'createdAt', 'twoFactorEnabled', 'role'].includes(params.id)) {
			return { 'msg': user[`${params.id}`]};
		}
		const userProfile = await prisma.userProfile.findFirst({
			where:{ User: user}
		});
		return { "msg" : userProfile[`${params.id}`] };
	}

	async updateUser(@Req() req: Request, @Body() data: any) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		const updatedField: any = await prisma.userProfile.findFirst({where: { User: user}});
		const parsedJson = JSON.parse(JSON.stringify(data));
		const key = Object.keys(parsedJson)[0];
		const value = parsedJson[key];
		updatedField[key] = value;
		try {
			await prisma.userProfile.updateMany({
				where:{ User: user},
				data: updatedField,
			});
		} catch (err) {
			throw new ConflictException('The username is already in use');
		}
	}
}
