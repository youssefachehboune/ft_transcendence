import { Body, Injectable, Req , Res} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { tokenDto } from './token.dto';


const prisma = new PrismaClient();

@Injectable()
export class TwoFactorService {

    async getTwoFactorStatus(@Req() req: Request): Promise<boolean>
    {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user['email']
            }
        })
        return user.twoFactorEnabled;
    }

    pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }
    async generateSecret(@Req() req: Request, @Res() res: Response) {
        const secret = authenticator.generateSecret();
        const user = await prisma.user.findUnique({
            where: {
                email: req.user['email']
            }
        })
        await prisma.user.update({
            where: {
                email: req.user['email']
            },
            data: {
                twoFactorSecret: secret
            }
        })
        const otpauthUrl = authenticator.keyuri(user.email, 'transcendence', secret);
        return this.pipeQrCodeStream(res, otpauthUrl)
    }

    async validateTwoFactor(@Req() req: Request, @Body() body: tokenDto): Promise<boolean>
    {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user['email']
            }
        })
        if(user === null || user.twoFactorSecret === null) {
            return false;
        }
				const token: string = body.token;
        const isValid = authenticator.verify({token , secret: user.twoFactorSecret });
        if (isValid) {
            await prisma.user.update({
                where: {
                    email: req.user['email']
                },
                data: {
                    twoFactorEnabled: true
                }
            })
            return true;
        }
        return false;
    }

    async verifyTwoFactor(@Req() req: Request, @Body() body: tokenDto)
    {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user['email']
            }
        })
        if(!user.twoFactorSecret) {
            return false;
        }
        const token: string = body.token;
        const isValid = authenticator.verify({token , secret: user.twoFactorSecret });
        if (isValid) {
            return true;
        }
        return false;
    }

    async disableTwoFactor(@Req() req: Request)
    {
        await prisma.user.update({
            where: {
                email: req.user['email']
            },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null
            }
        })
        return true;
    }
}
