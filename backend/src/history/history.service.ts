import { Req, Injectable, Body, BadRequestException } from '@nestjs/common';
import { PrismaClient, UserProfile } from '@prisma/client';
import { Request } from 'express';
import { historyDto } from './history.dto';

const prisma = new PrismaClient();
@Injectable()
export class HistoryService {
	async getHistory(@Req() req: Request) {
		return await prisma.careerLog.findMany({
			where: {  OR: [
				{User: req.user},
				{Opponent: req.user}
			]}
		});
	}
	async addMatch(@Req() req: Request, @Body() body: historyDto) {
		const userProfile: UserProfile = await prisma.userProfile.findUnique({
			where: { username: body.username }
		});
		if (!userProfile) {
			throw new BadRequestException('No user with the username provided');
		}
		let result : 'WON' | 'LOST';
		if (+body.opponentPoints > +body.userPoints)
			result = 'LOST';
		else if (+body.userPoints > +body.opponentPoints)
			result = 'WON';
		await prisma.careerLog.create({
			data: {
				user_id: req.user['id'],
				opponent_id: userProfile.user_id,
				userPoints: +body.userPoints,
				opponentPoints: +body.opponentPoints,
				result: result
			}
		});
	}
}
