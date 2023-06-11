import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}
    
    @Get()
    @UseGuards(JwtGuard)
    async getProfile(@Req() req: Request) {
        return await this.profileService.getProfile(req);
    }
}
