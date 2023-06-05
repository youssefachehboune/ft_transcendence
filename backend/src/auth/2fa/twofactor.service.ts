import { Injectable, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

@Injectable()
export class TwoFactorService {
    async getTwoFactorStatus(@Req() req: Request)
    {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user['email']
            }
        })
        return user.twoFactorEnabled;
    }
}
