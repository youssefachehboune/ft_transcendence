import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags , ApiParam} from '@nestjs/swagger';
import { FriendsService, FriendshipUpdateData, Status } from './friends.service';
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

    @Get('username/:username')
    @UseGuards(JwtGuard)
    @ApiParam({name: 'username', type: 'string', description: 'The username of the user to check friendship status', })
    async getFriendshipStatus(@Req() req: Request, @Param('username') username: string) {
        return await this.friendsService.getFriendshipStatus(req, username);
    }

    @Get('status/:status')
    @UseGuards(JwtGuard)
    @ApiParam({name: 'status', enum: ['REQUESTED', 'BLOCKED'], type: 'string', description: 'The status of friend requests', })
    async getFriendRequests(@Req() req: Request, @Param('status') status: 'REQUESTED' | 'BLOCKED') {
        return await this.friendsService.getFriendsByStatus(req, status);
    }

    @Post(':status/:username')
    @ApiParam({name: 'status', enum: Status, type: 'string', description: 'the new status of the friendship', })
    @ApiParam({name: 'username', type: 'string', description: 'The username of the user to update status', })
    @UseGuards(JwtGuard)
    async updateFriendStatus(@Req() req: Request, @Param('status') status: Status, @Param('username') username: string): Promise<FriendshipUpdateData | {message: string}> {
        return await this.friendsService.updateFriendStatus(req, status, username);
    }
}
