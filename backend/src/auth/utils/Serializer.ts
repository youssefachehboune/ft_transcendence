import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Done } from '../../utils/types';
import { AuthenticationProvider } from '../services/auth/auth';

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider) {
        super();
    }

    serializeUser(user: any, done: Done): any {
        done(null, user);
    }

    async deserializeUser(user: User, done: Done) {
        const userDB = await this.authService.findUser(user.email);
        return userDB ? done(null, userDB) : done(null, null);
    }
}