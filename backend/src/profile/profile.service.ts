import { PrismaClient, User, UserProfile } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

const prisma = new PrismaClient();


/*
    return {
        "avatar";
        "first_name";
        "last_name";
        "username";
        "Role";
        "frindship_status";
        info: {
            "location";
            "count_friends";
            "member_since";
            "email";
            "bio";
        };
        statistics: {
            "Global_rank";
            "level";
            "total_statistics";
            "win_streak";
        };
        Last_matches: {};
    }
*/

@Injectable()
export class ProfileService {
    async getProfile(req: Request) {
        const user : User = await prisma.user.findUnique({
            where: {
                email: req.user['email'],
            }
        });

        const userProfile : UserProfile = await prisma.userProfile.findFirst({
            where: {
                user_id: user.id,
            }
        });
        return userProfile;
    }
}
