import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class LeaderboardService {
	async getNumberOfPages() {
		const users = await prisma.user.findMany({});
		return Math.ceil(users.length / 10);
	}

	async getLeaderboard(page: number) {
		return await prisma.userProfile.findMany({
			where: {
				User: {
					OR: [
						{ role: 'ADMIN' },
						{ role: 'USER' },
					]
				}
			},
			orderBy: {
				level: 'desc'
			},
			select:{
				username: true,
				firstName: true,
				lastName: true,
				avatar: true,
				level: true,
				won: true,
				lost: true
			},
			take: 10,
			skip: page * 10 - 10,
		})
	}
}
