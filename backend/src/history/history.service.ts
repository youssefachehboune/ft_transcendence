import { Req, Injectable, Body, BadRequestException } from '@nestjs/common';
import { PrismaClient, UserProfile } from '@prisma/client';
import { Request } from 'express';
import { historyDto } from './history.dto';
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();
@Injectable()
export class HistoryService {
	async getHistory(@Req() req: Request) {
		const selectFields = {
			select: {
				firstName: true,
				lastName: true,
				username: true,
				avatar: true
			}
		};
		const history = await prisma.careerLog.findMany({
			where: {
				OR: [
					{ user_id: req.user['id'] },
					{ opponent_id: req.user['id'] }
				]
			},
			select: {
				userPoints: true,
				opponentPoints: true,
				occuredAt: true,
				User: {
					select: {
						userProfile: selectFields
					}
				},
				Opponent: {
					select: {
						userProfile: selectFields
					}
				}
			},
		});
		const updatedHistory = history.map(entry => ({
			...entry,
			occuredAt: formatDistanceToNow(new Date(entry.occuredAt), { addSuffix: true }),
			User: {
				username: entry.User.userProfile[0].username,
				firstName: entry.User.userProfile[0].firstName,
				lastName: entry.User.userProfile[0].lastName,
				avatar: entry.User.userProfile[0].avatar
			},
			Opponent: {
				username: entry.Opponent.userProfile[0].username,
				firstName: entry.Opponent.userProfile[0].firstName,
				lastName: entry.Opponent.userProfile[0].lastName,
				avatar: entry.Opponent.userProfile[0].avatar
			}
		}));
	
		return updatedHistory;
	}	

	async addMatch(@Req() req: Request, @Body() body: historyDto) {
		const userProfile: UserProfile = await prisma.userProfile.findUnique({
			where: { username: body.username }
		});
		if (!userProfile || userProfile.user_id == req.user['id']) {
			throw new BadRequestException('invalid username');
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
