import { PrismaClient, User, UserProfile } from '.prisma/client';
import { Injectable, Controller } from '@nestjs/common';
import { Request } from 'express';
import { FriendsService } from '../friend/friends.service';
import { HistoryService } from '../history/history.service';
const prisma = new PrismaClient();

@Injectable()
export class ProfileService {
    constructor(private readonly friendsService: FriendsService, private readonly historyService: HistoryService) { }

    async getGlobalRank(level) {
        const highterLevel = await prisma.userProfile.count({
            where: { level: { gt: level } },
        });
        const totalUsers = await prisma.user.count();
        const percentileRank = (highterLevel / totalUsers) * 100;
        if(percentileRank == 0) return 1 + "%";

        return percentileRank.toFixed(2) + "%" ;
    }

    async getProfile(req: Request) {

        const user: User = await prisma.user.findUnique({
            where: {
                email: req.user['email'],
            }
        });
        if (!user) throw new Error('user not found');
        const userProfile: UserProfile = await prisma.userProfile.findFirst({
            where: {
                user_id: user.id,
            }
        });
        const member_since = user.createdAt.toLocaleString('default', { month: 'long', year: 'numeric' });
        return {
            avatar: userProfile.avatar,
            full_name: userProfile.firstName + " " + userProfile.lastName,
            username: userProfile.username,
            Role: user.role,
            frindship_status: await this.friendsService.getFriendshipStatus(req, userProfile.username),
            info: {
                location: userProfile.location,
                count_friends: await this.friendsService.getFriendsCount(userProfile.username),
                member_since: member_since,
                email: user.email,
                bio: userProfile.bio
            },
            statistics: {
                Global_rank: await this.getGlobalRank(userProfile.level),
                level: userProfile.level,
                total_statistics: {
                    won: userProfile.won,
                    lost: userProfile.lost
                },
                win_streak: userProfile.winStreak,
            },
            Last_matches: await this.historyService.getHistorybyUsername(userProfile.username)

        }
    }

    async getOtherProfile(req: Request, username: string) {
        const user: User = await prisma.user.findUnique({
            where: {
                email: req.user['email'],
            }
        });
        if (!user) throw new Error('user not found');
        const Profile: UserProfile = await prisma.userProfile.findFirst({
            where: {
                username: username,
            }
        });
        if (!Profile) throw new Error('user not found');
        const profileUser: User = await prisma.user.findUnique({
            where: {
                id: Profile.user_id,
            }
        });
        if (!profileUser) throw new Error('user not found');
        const member_since = profileUser.createdAt.toLocaleString('default', { month: 'long', year: 'numeric' });
        return {
            avatar: Profile.avatar,
            full_name: Profile.firstName + " " + Profile.lastName,
            username: Profile.username,
            Role: profileUser.role,
            frindship_status: await this.friendsService.getFriendshipStatus(req, Profile.username),
            info: {
                location: Profile.location,
                count_friends: await this.friendsService.getFriendsCount(Profile.username),
                member_since: member_since,
                email: profileUser.email,
                bio: Profile.bio
            },
            statistics: {
                Global_rank: await this.getGlobalRank(Profile.level),
                level: Profile.level,
                total_statistics: {
                    won: Profile.won,
                    lost: Profile.lost
                },
                win_streak: Profile.winStreak,
            },
            Last_matches: await this.historyService.getHistorybyUsername(Profile.username)
        }
    }
}
