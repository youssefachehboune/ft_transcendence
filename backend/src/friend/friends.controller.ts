import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags , ApiParam} from '@nestjs/swagger';
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
        return await this.friendsService.getFriendsList(req);
    }

    @Get(':status')
    @UseGuards(JwtGuard)
    @ApiParam({name: 'status', enum: ['REQUESTED', 'BLOCKED'], type: 'string', description: 'The status of friend requests', })
    async getFriendRequests(@Req() req: Request, @Param('status') status: 'REQUESTED' | 'BLOCKED') {
        return await this.friendsService.getFriendsByStatus(req, status);
    }

    @Post(':username')
    @ApiParam({name: 'username', type: 'string', description: 'The username of the user to add as a friend', })
    @UseGuards(JwtGuard)
    async addFriend(@Req() req: Request, @Param('username') username: string) {
        return await this.friendsService.addFriend(req, username);
    }
}
