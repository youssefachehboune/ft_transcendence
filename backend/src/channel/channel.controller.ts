import { Controller, Get, Req, UseGuards, Param, Post, Put, Body } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ChannelDTO } from './channel.dto';
import { miniChannelDto } from './channel.dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @UseGuards(JwtGuard)
    @Get('my_channels')
    async getMyChannels(@Req() req: Request) {
        return await this.channelService.getMyChannels(req);
    }

    @UseGuards(JwtGuard)
    @Get('channels')
    async getChannels(@Req() req: Request) {
        return await this.channelService.getChannels(req);
    }

		@UseGuards(JwtGuard)
		@Get('invitations')
		async getInvitations(@Req() req: Request) {
				return await this.channelService.getInvitations(req);
		}

    @UseGuards(JwtGuard)
    @Get(':channel_name')
    @ApiParam({ name: 'channel_name', type: String })
    async getChannel(@Req() req: Request, @Param('channel_name') channel_name: string) {
        return await this.channelService.getChannel(req, channel_name);
    }

    @UseGuards(JwtGuard)
    @Get(':channel_name/members')
    @ApiParam({ name: 'channel_name', type: String })
    async getChannelMembers(@Req() req: Request, @Param('channel_name') channel_name: string) {
        return await this.channelService.getChannelMembers(req, channel_name);
    }

    @UseGuards(JwtGuard)
    @Get('type/:channel_name/:username')
    @ApiParam({ name: 'channel_name', type: String })
    @ApiParam({ name: 'username', type: String })
    async getMemberType(@Param('channel_name') channel_name: string, @Param('username') username: string) {
        return await this.channelService.getMemberType(channel_name, username);
    }

    @UseGuards(JwtGuard)
    @Get(':channel_name/:type')
    @ApiParam({ name: 'channel_name', type: String })
    @ApiParam({ name: 'type', enum: ['INVITED', 'BANNED', 'MUTED', 'REQUESTED'], type: String })
    async getSpecificUsers(@Req() req: Request, @Param('channel_name') channel_name: string, @Param('type') type: 'INVITED' | 'BANNED' | 'MUTED' | 'REQUESTED') {
        return await this.channelService.getSpecificUsers(req, channel_name, type);
    }

    @UseGuards(JwtGuard)
    @Post('create')
    async createChannel(@Req() req: Request, @Body() channelDto: ChannelDTO) {
        return await this.channelService.createChannel(req, channelDto);
    }

    @UseGuards(JwtGuard)
    @Put('update/:channel_name')
    @ApiParam({ name: 'channel_name', type: String })
    async updateChannel(@Req() req: Request,@Param('channel_name') channel_name : string , @Body() channelDto: ChannelDTO) {
        return await this.channelService.updateChannel(req, channel_name , channelDto);
    }

    @UseGuards(JwtGuard)
    @Put('delete/:channel_name')
    @ApiParam({ name: 'channel_name', type: String })
    async deleteChannel(@Req() req: Request,@Param('channel_name') channel_name : string) {
        return await this.channelService.deleteChannel(req, channel_name);
    }

    @UseGuards(JwtGuard)
    @Put('Admin/:channel_name/:username/:action')
    @ApiParam({ name: 'channel_name', type: String })
    @ApiParam({ name: 'username', type: String })
    @ApiParam({ name: 'action', enum: ['ban', 'mute', 'kick', 'unban', 'unmute', 'accept', 'reject', 'invite', 'uninvite', 'makeAdmin', 'makeUser'] })
    async AdminActions(@Req() req: Request,@Param('channel_name') channel_name : string , @Param('username') username : string , @Param('action') action : 'ban' | 'mute' | 'kick' | 'unban' | 'unmute' | 'accept' | 'reject' | 'invite' | 'uninvite' | 'makeAdmin' | 'makeUser') {
        return await this.channelService.AdminActions(req, channel_name , username , action);
    }

    @UseGuards(JwtGuard)
    @Put('/user/:action')
    @ApiParam({ name: 'action', enum: ['join', 'leave', 'cancel', 'accept', 'reject'] })
    async UserActions(@Req() req: Request, @Body() miniChannel: miniChannelDto , @Param('action') action : 'join' | 'leave' | 'cancel' | 'accept' | 'reject') {
        return await this.channelService.UserActions(req, miniChannel.password, miniChannel.name , action);
    }
}
