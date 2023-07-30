import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { achievementDto } from './achievements.dto';
import { NotificationService, NotificationType } from 'src/notification/notification.service';
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();
@Injectable()
export class AchievementsService {
	constructor(private readonly notificationService: NotificationService) {}

	async getAchievements(@Req() req: Request, type: 'ALL' | 'COMPLETE' | 'UNCOMPLETE', take?: number) {
		const achievements = await prisma.achievement.findMany({
			where: {},
			include: {
				AchievementLog: {
					where: { User: req.user },
					select: {
						score: true,
						occuredAt: true
					}
				}
			}
		});
		let updatedAchievements = achievements
		.sort((a, b) => {
			const dateA: any = a.AchievementLog[0] ? a.AchievementLog[0].occuredAt : '';
			const dateB: any = b.AchievementLog[0] ? b.AchievementLog[0].occuredAt : '';
			return dateB - dateA;
		})
		.map(entry => {
			const { id, AchievementLog, ...rest } = entry;
			return {
				...rest,
				score: AchievementLog[0] ? AchievementLog[0].score : 0,
				occuredAt: AchievementLog[0] ? formatDistanceToNow(new Date(entry.AchievementLog[0].occuredAt), { addSuffix: true }) : ''
			};
		});
		if (take)
			updatedAchievements = updatedAchievements.slice(0, take);
		if (type === 'UNCOMPLETE')
			return updatedAchievements.filter(entry => entry.score !== +entry.milestone);
		else if (type === 'COMPLETE')
			return updatedAchievements.filter(entry => entry.score === +entry.milestone);
		else
			return updatedAchievements;
	}
	
	async updateAchievements(@Req() req: Request, @Body() achiev: achievementDto) {
		const achievement = await prisma.achievement.findUnique({
			where: {name: achiev.name},
			include: {AchievementLog: true}
		});
		if (!achievement)
		throw new BadRequestException('The achievement name is invalid');
		const achievementLog = await prisma.achievementLog.findFirst({
			where: { User: req.user, achievement_id: achievement.id }
		});
		const newscore: number = achievementLog?.score + 1;
		if (!newscore) {
			await prisma.achievementLog.create({
				data: {
					user_id: req.user['id'],
					achievement_id: achievement.id,
					score: 1,
					occuredAt: new Date(),
				}
			});
			if (+achievement.milestone == 1) {
				this.notificationService.setNotification(NotificationType.ACHIEVEMENT, 0, req.user['id']);
				return true;
			}
			return false;
		}
		if (newscore && newscore > +achievement.milestone)
			throw new BadRequestException('This achievement has already been accomplished');
		if (achiev.reset == true) {
			await prisma.achievementLog.updateMany({
				where: { user_id: req.user['id'], achievement_id: achievement.id },
				data: { score: 0, occuredAt: new Date() }
			});
			return false;
		}
		await prisma.achievementLog.updateMany({
			where: { user_id: req.user['id'], achievement_id: achievement.id },
			data: { score: newscore, occuredAt: new Date() }
		});
		if (newscore == +achievement.milestone) {
			this.notificationService.setNotification(NotificationType.ACHIEVEMENT, 0, req.user['id']);
			return true;
		}
		return false;
	}
}
