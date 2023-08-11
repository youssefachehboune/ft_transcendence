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

	async getUsername(username: string) {
		const user = await prisma.userProfile.findUnique({
			where: { username }
		})
		if (user) {
			username += Math.floor(Math.random() * 9);
			return this.getUsername(username);
		}
		return username;
	}

	async deleteAccount(@Req() req: Request) {
		const username = await this.getUsername('disabled_account');
		const user = await prisma.user.update({
			where: {
				email: req.user['email']
			},
			data: {
				role: 'BANNED',
				email: `${username}@example.com`
			}
		});
		await prisma.userProfile.update({
			where: {
				user_id: user.id
			},
			data: {
				avatar: 'http://res.cloudinary.com/dlubm2sog/image/upload/v1691246180/avatar.webp',
				firstName: 'disabled',
				lastName: 'account',
				username: username
			}
		})
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

	async getUserDataById(@Req() req: Request, id : number) {
		id = parseInt(id.toString());
		const user = await prisma.user.findUnique({
			where: { id: id }
		});
		const userProfile = await prisma.userProfile.findFirst({
			where:{ User: user}
		});
		return {
			avatar: userProfile.avatar,
			name: userProfile.firstName + " " + userProfile.lastName,
			username: userProfile.username,
		}
	}

	async updateUser(@Req() req: Request, @Body() data: UserDto) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		const updatedField: any = await prisma.userProfile.findFirst({where: { User: user}});
		if (data.avatar.length > 500)
			data.avatar = (await cloudinary.uploader.upload( data.avatar, { public_id: data.username } )).url;
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

	async getUserId(@Req() req: Request) {
		const user = await prisma.user.findUnique({
			where: { email: req.user["email"] }
		});
		return user.id;
	}


	async getUserDataByUserId(id: number) {
		if (id == null)
			return null;
		const user = await prisma.user.findUnique({
			where: { id: id }
		});
		if (user == null)
			return null;
		const userProfile = await prisma.userProfile.findFirst({
			where:{ User: user}
		});
		return {
			userId : user.id,
			avatar: userProfile.avatar,
			fullname: userProfile.firstName + " " + userProfile.lastName,
			username: userProfile.username,
		}
	}
}
