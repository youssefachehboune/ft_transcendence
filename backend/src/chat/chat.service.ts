import { Injectable, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { PrismaClient, User } from '@prisma/client';
import { Request } from 'express'

const prisma = new PrismaClient();
@Injectable()
export class ChatService {
	constructor( private readonly authService: AuthService ) {}
	
  async getUserFromSocket(socket: Socket) {
		const cookie = socket.handshake.headers.cookie;
		if (typeof cookie === 'string' && cookie) {
			const { jwt } = parse(cookie);
			let user = null;
			if (jwt) {
				user = await this.authService.getUserFromAuthenticationToken(jwt);
				if (!user) {
					throw new WsException('Invalid credentials.'); 
				}
			}
			return user;
		}
  }
	
	async saveMessage(content: { username: string, message: string }, author: User) {
		const recipient = await prisma.userProfile.findUnique({
			where: {
				username: content.username
			}
		});
		
		await prisma.chat.create({
			data: {
				sender_id: author.id,
				recipient_id: recipient.user_id,
				message: content.message
			}
		});
  }
	async getChat(@Req() req: Request) {
		return await prisma.chat.findMany({
			where: {
				OR: [
					{ sender_id: req.user['id'] },
					{ recipient_id: req.user['id'] }
				]
			},
			orderBy: {
				sentAt: 'desc'
			}
		});
	}
}