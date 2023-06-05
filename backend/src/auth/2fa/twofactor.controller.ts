import { Controller , Get, Req, Res, UseGuards} from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { JwtGuard } from '../guards/jwt.guard';
import { Request , Response} from 'express';

@Controller('2fa')
export class TwoFactorController {
    constructor(private twoFactorService: TwoFactorService){}
    
    @Get('status')
    @UseGuards(JwtGuard)
    async getTwoFactorStatus(@Req() req: Request): Promise<boolean>
    {
        return this.twoFactorService.getTwoFactorStatus(req);
    }

    @Get('generate')
    @UseGuards(JwtGuard)
    async generateSecret(@Req() req: Request, @Res() res: Response) {
        return this.twoFactorService.generateSecret(req, res);
    }

    @Get('validate')
    @UseGuards(JwtGuard)
    async validateTwoFactor(@Req() req: Request): Promise<boolean>
    {
        return this.twoFactorService.validateTwoFactor(req);
    }

    @Get('verify')
    @UseGuards(JwtGuard)
    async verifyTwoFactor(@Req() req: Request)
    {
        return this.twoFactorService.verifyTwoFactor(req);
    }

    @Get('disable')
    @UseGuards(JwtGuard)
    async disableTwoFactor(@Req() req: Request)
    {
        return this.twoFactorService.disableTwoFactor(req);
    }
}
