import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express'
import { UserDto } from './user.dto'
import {v2 as cloudinary} from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({ 
  cloud_name: 'dlubm2sog', 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const prisma = new PrismaClient();

@Injectable()
export class UserService {
	async deleteAccount(@Req() req: Request) {
		await prisma.user.update({
			where: {
				email: req.user['email']
			},
			data: {
				role: 'BANNED'
			}
		});
		return 'Account deleted successfully';
	}

	async getUserData(@Req() req: Request) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		const userProfile = await prisma.userProfile.findFirst({
			where:{ User: user}
		});
		return {
			avatar: userProfile.avatar,
			firstName: userProfile.firstName,
			username: userProfile.username,
		}
	}

	async updateUser(@Req() req: Request, @Body() data: UserDto) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		const updatedField: any = await prisma.userProfile.findFirst({where: { User: user}});
		if (data.avatar.length > 500)
			data.avatar = (await cloudinary.uploader.upload( data.avatar, { public_id: "avatar" } )).url;
		const parsedJson = JSON.parse(JSON.stringify(data));
		const keys = Object.keys(parsedJson);
	  keys.forEach((key) => {
			const value = parsedJson[key];
			updatedField[key] = value;
		});
		try {
			await prisma.userProfile.updateMany({
				where:{ User: user},
				data: updatedField,
			});
		} catch (err) {
			throw new BadRequestException;
		}
	}
}
