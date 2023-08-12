import { Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();
@Injectable()
export class AchievementsService {
	constructor() {}

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
		if (type === 'UNCOMPLETE')
			return updatedAchievements.filter(entry => entry.score !== +entry.milestone);
		else if (type === 'COMPLETE')
		{
			updatedAchievements =  updatedAchievements.filter(entry => entry.score === +entry.milestone);
			if(take)
				return updatedAchievements.slice(0, take);
			else
				return updatedAchievements;
		}
		else
			return updatedAchievements;
	}
	
	async updateAchievements(userId: number, achievname: string, reset : boolean) {
		const achievement = await prisma.achievement.findUnique({
			where: { name: achievname },
			include: {AchievementLog: true}
		});
		if (!achievement)
			return null;
		const achievementLog = await prisma.achievementLog.findFirst({
			where: { user_id: userId, achievement_id: achievement.id },
		});
		const newscore: number = achievementLog?.score + 1;
		if (!newscore) {
			await prisma.achievementLog.create({
				data: {
					user_id: userId,
					achievement_id: achievement.id,
					score: 1,
					occuredAt: new Date(),
				}
			});
			if (+achievement.milestone == 1) {
				return true;
			}
			return false;
		}
		if (newscore && newscore > +achievement.milestone)
			return null;
		if (reset == true) {
			await prisma.achievementLog.updateMany({
				where: { user_id: userId, achievement_id: achievement.id },
				data: { score: 0, occuredAt: new Date() }
			});
			return false;
		}
		await prisma.achievementLog.updateMany({
			where: { user_id: userId, achievement_id: achievement.id },
			data: { score: newscore, occuredAt: new Date() }
		});
		if (newscore == +achievement.milestone) {
			return true;
		}
		return false;
	}
}
