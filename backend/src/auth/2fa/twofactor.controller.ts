import { Controller , Get, Req, Res, UseGuards} from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { JwtGuard } from '../guards/jwt.guard';
import { Request , Response} from 'express';

@Controller('2fa')
export class TwoFactorController {
    constructor(private twoFactorService: TwoFactorService){}
    
    // 2FA status endpoint (GET /2fa/status)
    // This endpoint should return boolean value
    @Get('status')
    @UseGuards(JwtGuard)
    async getTwoFactorStatus(@Req() req: Request): Promise<boolean>
    {
        return this.twoFactorService.getTwoFactorStatus(req);
    }

    // 2FA generate secret endpoint (GET /2fa/generate)
    // This endpoint should return QR code image
    @Get('generate')
    @UseGuards(JwtGuard)
    async generateSecret(@Req() req: Request, @Res() res: Response) {
        return this.twoFactorService.generateSecret(req, res);
    }

    // 2FA validate token endpoint (POST /2fa/validate)
    // This endpoint should return boolean value of token is valid or not
    @Get('validate')
    @UseGuards(JwtGuard)
    async validateTwoFactor(@Req() req: Request): Promise<boolean>
    {
        return this.twoFactorService.validateTwoFactor(req);
    }
}
