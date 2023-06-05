import { Controller , Get, Req, UseGuards} from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { JwtGuard } from '../guards/jwt.guard';
import { Request } from 'express';

@Controller('2fa')
export class TwoFactorController {
    constructor(private twoFactorService: TwoFactorService){}
    
    @Get('status')
    @UseGuards(JwtGuard)
    async getTwoFactorStatus(@Req() req: Request)
    {
        return this.twoFactorService.getTwoFactorStatus(req);
    }
}
