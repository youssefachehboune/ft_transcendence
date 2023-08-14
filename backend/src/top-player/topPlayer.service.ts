import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

@Injectable()
export class TopPlayerService {
    async getTopPlayer(): Promise<object> {
        const topPlayer = await prisma.userProfile.findMany({
            where: {
                User: {
                    OR: [
                        { role: 'ADMIN' },
                        { role: 'USER' },
                    ]
                }
            },
            take: 3,
            orderBy: {
                level: 'desc'
            },
            select: {
                avatar: true,
                firstName: true,
                lastName: true,
                username: true
            }
        });
        return topPlayer;
    }
}