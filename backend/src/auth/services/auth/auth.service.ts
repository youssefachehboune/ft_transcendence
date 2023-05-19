import { Injectable } from '@nestjs/common';
import { AuthenticationProvider } from './auth';
import { Tokens, UserDetails } from '../../../utils/types';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Res } from '@nestjs/common';
@Injectable()
export class AuthService implements AuthenticationProvider{
    constructor(private prisma: PrismaService,
        private jwtService: JwtService
        ) {}
    
    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }
    async validateUser(details: UserDetails) : Promise<Tokens | User> {
        const {email: email1} = details;
        const user = await this.prisma.user.findFirst({
            where: {
                email: email1
            }
        });
        if (user)
            return user;
        return this.createUser(details);
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                }, {
                    secret: 'at_secret',
                    expiresIn: 60 * 15,
                }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                }, {
                    secret: 'rt_secret',
                    expiresIn: 60 * 60 * 24 * 7,
                })
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async createUser(details: UserDetails) : Promise<Tokens> {
        const {email, username, avatar} = details;
        const newUser = await this.prisma.user.create({
            data: {
                email,
                twoFactorEnabled : false,
                role: 'USER',
                userProfile: {
                    create: {
                        username,
                        avatar,
                        bio: "",
                        location: "",
                        level: 0,
                    }
                }
            }
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        console.log(tokens);
        return tokens;
    }
    findUser(email: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        });
    }

    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash,
            },
        });
    }

}
