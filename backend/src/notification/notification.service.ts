import { Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express'
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();
export enum NotificationType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  ACCEPTED_REQUEST = 'ACCEPTED_REQUEST',
  ACHIEVEMENT = 'ACHIEVEMENT',
  LEVEL_UP = 'LEVEL_UP',
  GAME_INVITE = 'GAME_INVITE',
  GAME_UPDATES = 'GAME_UPDATES'
}

@Injectable()
export class NotificationService {
	async getNotifications(@Req() req: Request) {
		const notifications = await prisma.notification.findMany({
			where: { recipient_id: req.user['id'] },
			include: { Sender: { include: { userProfile: true }} }
		});
		return notifications.map(notification => {
			let fullName: string;
			let avatar:string;
			if (notification.Sender) {
				fullName = notification.Sender.userProfile[0].firstName + ' ' + notification.Sender?.userProfile[0].lastName;
				avatar = notification.Sender?.userProfile[0].avatar;
			}
			return {
				type: notification.type,
				occuredAt: formatDistanceToNow(new Date(), { addSuffix: true }),
				read: notification.read,
				fullName: fullName,
				avatar: avatar
			}
		})
	}
	
	async setNotification(type: NotificationType, senderid: number, recipientid: number) {
		const data = {
			type,
			recipient_id: recipientid,
			read: false
		};
		if (['FRIEND_REQUEST', 'ACCEPTED_REQUEST', 'GAME_INVITE'].includes(type)) {
			Object.assign(data, { sender_id: senderid });
		}
		await prisma.notification.create({ data });
	}
}
