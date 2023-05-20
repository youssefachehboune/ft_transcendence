import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { Strategy } from "passport-42";



config();
const prisma = new PrismaClient();

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
    constructor()
    {
        super({
            clientID: process.env.INTRA_CLIENT_ID,
            clientSecret: process.env.INTRA_SECRET,
            callbackURL: 'http://localhost:3000/intra/redirect',
            scope: ['public'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any>
    {
        const intraUser = {email: profile._json.email, username: profile._json.login, avatar: profile._json.image.link};
        let dbuser = await prisma.user.findUnique({
            where: {email: intraUser.email},
        });
        if (!dbuser) {
            dbuser = await prisma.user.create({
                data: {
                    email: intraUser.email,
                    twoFactorEnabled: false,
                    role: 'USER',
                },
            });
            await prisma.userProfile.create({
                data: {
                    user_id: dbuser.id,
                    username: intraUser.username,
                    bio: "",
                    location: "",
                    avatar: intraUser.avatar,
                    level: 0,
                }
            })
        }
        return intraUser;
    }
}