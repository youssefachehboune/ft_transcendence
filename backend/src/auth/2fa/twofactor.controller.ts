/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller , Get, UseGuards} from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('2fa')
export class TwoFactorController {
    constructor(private twoFactorService: TwoFactorService){}
    
    
    @Get()
    @UseGuards(JwtGuard)
    getHello(): string {
        return this.twoFactorService.getHello();
    }
}
