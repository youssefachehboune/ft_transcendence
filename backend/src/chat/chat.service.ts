import { Injectable, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { ChannelLog, PrismaClient, User } from '@prisma/client';
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

	async getChat(@Req() req: Request, username: string) {
		try {
			const id = (await prisma.userProfile.findUnique({
				where: { username: username },
			})).user_id;
			const chat = await prisma.chat.findMany({
				where: {
					OR: [
						{ sender_id: req.user['id'], recipient_id: id },
						{ sender_id: id, recipient_id: req.user['id'] }
					]
				},
				orderBy: {
					sentAt: 'asc'
				}
			});
			const res = await Promise.all(chat.map(async (chat) => {
				const sender_username = (await prisma.userProfile.findFirst({
					where: { user_id: chat.sender_id }
				})).username;
				const recipient_username = (await prisma.userProfile.findFirst({
					where: { user_id: chat.recipient_id }
				})).username;
				return {
					message: chat.message,
					sentAt: chat.sentAt,
					readAt: chat.readAt,
					sender_username: sender_username,
					recipient_username: recipient_username
				};
			}));
			return res;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async saveChannelMessage(content: { channel: string, message: string }, user: User) {
		const channel = await prisma.channel.findUnique({
			where: { name: content.channel }
		});
		await prisma.channelLog.create({
			data: {
				user_id: user.id,
				channel_id: channel.id,
				message: content.message
			}
		})
	}

	async getChannelChat(@Req() req: Request, channel: string) {
		try {
			const channel_id = (await prisma.channel.findUnique({
				where: { name: channel }
			}))?.id;
			const member = await prisma.channelMembers.findFirst({
				where: { user_id: req.user['id'] , channel_id: channel_id }
			});
			if (member.MemberType !== 'ADMIN' && member.MemberType !== 'OWNER' && member.MemberType !== 'MEMBER')
				throw new WsException('You are not a member of the channel');
			const channelLog = await prisma.channelLog.findMany({
				where: { channel_id: channel_id }
			})
			const logs: any[] = [];
			for (let i = 0; i < channelLog.length; i++) {
				const blockingUser = await prisma.friendship.findFirst({
					where: { user_id: channelLog[i].user_id, friend_id: req.user['id'], status: 'BLOCKED'}
				});
				if (!blockingUser) {
					const avatar = (await prisma.userProfile.findFirst({
						where: { user_id: channelLog[i].user_id }
					})).avatar;
					logs.push({ avatar: avatar, message: channelLog[i].message })
				}
			}
			return logs;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async getBlockedUsers(users: string[], userId: number) {
		try {
			const blockedList: string[] = [];
			for (let i = 0; i < users.length; i++) {
				const friendId = (await prisma.userProfile.findUnique({
					where: { username: users[i] }
				})).user_id;
				const blockedFriend = await prisma.friendship.findFirst({
					where: {
						user_id: userId, friend_id: friendId, status: 'BLOCKED'
					}
				});
				if (blockedFriend)
					blockedList.push(users[i]);
			}
			return blockedList;
		} catch (err) {
			console.log(err);
			return [];
		}
	}
}