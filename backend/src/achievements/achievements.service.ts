import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { achievementDto } from './achievements.dto';

const prisma = new PrismaClient();
@Injectable()
export class AchievementsService {
	async getAchievements() {
		return await prisma.achievement.findMany();
	}
	
	async getAchievementsLog(@Req() req: Request) {
		return await prisma.achievementLog.findMany({
			where: { User: req.user}
		});
	}
	
	async updateAchievements(@Req() req: Request, @Body() achiev: achievementDto) {
		const achievement = await prisma.achievement.findUnique({
			where: {name: achiev.name},
			include: {AchievementLog: true}
		});
		if (!achievement)
			throw new BadRequestException('The achievement name is invalid');
		const newscore: number = achievement.AchievementLog[0]?.score + 1;
		if (!newscore) {
			await prisma.achievementLog.create({
				data: {
					user_id: req.user['id'],
					achievement_id: achievement.id,
					score: 1,
					occuredAt: new Date(),
				}
			});
			if (+achievement.milestone == 1)
				return true;
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
		if (newscore == +achievement.milestone)
			return true;
		return false;
	}
}
