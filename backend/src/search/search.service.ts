import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient, User, UserProfile, Friendship } from '@prisma/client';

@Injectable()
export class SearchService {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async search(@Req() req: Request, username: string) {
        try {
            const user: User = await this.prisma.user.findUnique({
                where: { email: req.user["email"] },
                include: { userProfile: true }
            });

            if (!user) {
                return {
                    message: "NotFound"
                };
            }

            const suserProfile: UserProfile = await this.prisma.userProfile.findFirst({
                where: { username: username }
            });

            if (!suserProfile) {
                return {
                    message: "NotFound"
                };
            }

            if (user.id === suserProfile.user_id) {
                return {
                    avatar: suserProfile.avatar,
                    firstName: suserProfile.firstName,
                    lastName: suserProfile.lastName,
                    username: suserProfile.username,
                };
            }

            const friendShipStatus: Friendship | null = await this.prisma.friendship.findFirst({
                where: {
                    OR: [
                        {
                            AND:[
                                { user_id: user.id },
                                { friend_id: suserProfile.user_id }
                            ]
                        },
                        {
                            AND:[
                                { user_id: suserProfile.user_id },
                                { friend_id: user.id }
                            ]
                        }
                    ]
                }
            });

            return {
                avatar: suserProfile.avatar,
                firstName: suserProfile.firstName,
                lastName: suserProfile.lastName,
                username: suserProfile.username,
                friendShipStatus: friendShipStatus ? friendShipStatus.status : "NOTFRIENDS"
            };
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                message: "An error occurred"
            };
        }
    }
}
