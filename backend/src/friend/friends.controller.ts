import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @Get()
    @UseGuards(JwtGuard)
    async getFriends(@Req() req: Request) {
        return await this.friendsService.getFriends(req);
    }

    @Get('requests')
    @UseGuards(JwtGuard)
    async getFriendRequests(@Req() req: Request) {
        return await this.friendsService.getFriendRequests(req);
    }
}
