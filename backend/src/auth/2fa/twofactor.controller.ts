import { Body, Controller , Delete, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { JwtGuard } from '../guards/jwt.guard';
import { Request , Response} from 'express';
import { ApiTags } from '@nestjs/swagger';
import { tokenDto } from './token.dto';

@ApiTags('2fa')
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

    @Post('validate')
    @UseGuards(JwtGuard)
    async validateTwoFactor(@Req() req: Request, @Body() body: tokenDto): Promise<boolean>
    {
        return this.twoFactorService.validateTwoFactor(req, body);
    }

    @Post('verify')
    @UseGuards(JwtGuard)
    async verifyTwoFactor(@Req() req: Request, @Body() body: tokenDto)
    {
        return this.twoFactorService.verifyTwoFactor(req, body);
    }

    @Delete()
    @UseGuards(JwtGuard)
    async disableTwoFactor(@Req() req: Request)
    {
        return this.twoFactorService.disableTwoFactor(req);
    }
}
