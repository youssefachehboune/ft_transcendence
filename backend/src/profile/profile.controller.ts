import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

    @Get(':username')
    @UseGuards(JwtGuard)
    @ApiParam({name: 'username', type: String})
    async getOtherProfile(@Req() req: Request, @Param('username') username: string) {
        return await this.profileService.getOtherProfile(req, username);
    }


}
