import { Req, Injectable, Body, BadRequestException, Param } from '@nestjs/common';
import { PrismaClient, UserProfile } from '@prisma/client';
import { Request } from 'express';
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();
@Injectable()
export class HistoryService {
	async getNumberOfPages(@Req() req: Request) {
		const history = await prisma.careerLog.findMany({
			where: {
				OR: [
					{ user_id: req.user['id'] },
					{ opponent_id: req.user['id'] }
				],
			}
		});
		return Math.ceil(history.length / 10);
	}
	
	async getHistory(@Req() req: Request, page: number, filter: 'WON' | 'LOST' | 'ALL', take?: number) {
		const selectFields = {
			select: {
				firstName: true,
				lastName: true,
				username: true,
				avatar: true
			}
		};

		let filtermtp;

		if(filter === 'WON') {
			filtermtp = { user_id: req.user['id'] }
		}
		else if(filter === 'LOST') {
			filtermtp = { opponent_id: req.user['id'] }
		}
		else if(filter === 'ALL'){
			filtermtp = {
				OR: [
					{ user_id: req.user['id'] },
					{ opponent_id: req.user['id'] }
				],
			}
		}
		const history = await prisma.careerLog.findMany({
			where: {
				...filtermtp
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
			take: take || 10,
			orderBy: {
				occuredAt: 'desc'
			},
			skip: page * 10 - 10
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

	async getHistorybyUsername(username: string) {
		const selectFields = {
			select: {
				firstName: true,
				lastName: true,
				username: true,
				avatar: true
			}
		};
		const userProfile: UserProfile = await prisma.userProfile.findUnique({
			where: { username }
		});
		if (!userProfile) throw new BadRequestException('invalid username');
		const history = await prisma.careerLog.findMany({

			where: {
				OR: [
					{ user_id: userProfile.user_id },
					{ opponent_id: userProfile.user_id }
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
			orderBy: {
				occuredAt: 'desc'
			},
			take: 4
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

	async addMatch(userId : number, OppeonentId : number, userPoints : number, opponentPoints: number) {
		await prisma.careerLog.create({
			data: {
				user_id: userId,
				opponent_id: OppeonentId,
				userPoints: userPoints,
				opponentPoints: opponentPoints,
			}
		});
	}
}
