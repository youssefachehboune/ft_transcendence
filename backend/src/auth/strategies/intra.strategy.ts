import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { Strategy } from "passport-42";



config();
const prisma = new PrismaClient();

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
    constructor() {
        super({
            clientID: process.env.INTRA_CLIENT_ID,
            clientSecret: process.env.INTRA_SECRET,
            callbackURL: 'http://localhost:3000/intra/redirect',
            scope: ['public'],
        });
    }
    async getUsername(username: string): Promise<string> {
        const user = await prisma.userProfile.findUnique({
            where: {
                username
            }
        })
        if (user) {
            username += Math.floor(Math.random() * 9);
            return this.getUsername(username);
        }
        return username;
    }
    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        const intraUser = { firstName: profile._json.first_name, lastName: profile._json.last_name, email: profile._json.email, username: profile._json.login, avatar: profile._json.image.link };
        let dbuser = await prisma.user.findUnique({
            where: { email: intraUser.email },
        });
        if (!dbuser) {
            dbuser = await prisma.user.create({
                data: {
                    email: intraUser.email,
                    twoFactorEnabled: false,
                    role: 'USER',
                },
            });
            let username1 = await this.getUsername(intraUser.username);
            await prisma.userProfile.create({
                data: {
                    user_id: dbuser.id,
                    username: username1,
                    firstName: intraUser.firstName,
                    lastName: intraUser.lastName,
                    bio: "",
                    location: "",
                    avatar: intraUser.avatar,
                    level: 0,
                    points: 0,
                    won: 0,
                    lost: 0,
                    winStreak: 0,
                }
            })
        }
        return intraUser;
    }
}
