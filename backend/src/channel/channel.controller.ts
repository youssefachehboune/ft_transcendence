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
    @Get('public_channels')
    async getPublicChannels(@Req() req: Request) {
        return await this.channelService.getPublicChannels(req);
    }

		@UseGuards(JwtGuard)
		@Get('invitations')
		async getInvitations(@Req() req: Request) {
				return await this.channelService.getInvitations(req);
		}

    @UseGuards(JwtGuard)
    @Get(':channel_id')
    @ApiParam({ name: 'channel_id', type: Number })
    async getChannel(@Req() req: Request, @Param('channel_id') channel_id: number) {
        return await this.channelService.getChannel(req, channel_id);
    }

    @UseGuards(JwtGuard)
    @Get(':channel_id/members')
    @ApiParam({ name: 'channel_id', type: Number })
    async getChannelMembers(@Req() req: Request, @Param('channel_id') channel_id: number) {
        return await this.channelService.getChannelMembers(req, channel_id);
    }

    @UseGuards(JwtGuard)
    @Post('create')
    async createChannel(@Req() req: Request, @Body() channelDto: ChannelDTO) {
        return await this.channelService.createChannel(req, channelDto);
    }

    @UseGuards(JwtGuard)
    @Put('update/:channelId')
    @ApiParam({ name: 'channelId', type: Number })
    async updateChannel(@Req() req: Request,@Param('channelId') channelId : number , @Body() channelDto: ChannelDTO) {
        return await this.channelService.updateChannel(req, channelId , channelDto);
    }

    @UseGuards(JwtGuard)
    @Put('delete/:channelId')
    @ApiParam({ name: 'channelId', type: Number })
    async deleteChannel(@Req() req: Request,@Param('channelId') channelId : number) {
        return await this.channelService.deleteChannel(req, channelId);
    }

    @UseGuards(JwtGuard)
    @Put('Admin/:channelId/:userId/:action')
    @ApiParam({ name: 'channelId', type: Number })
    @ApiParam({ name: 'userId', type: Number })
    @ApiParam({ name: 'action', enum: ['ban', 'mute', 'kick', 'unban', 'unmute', 'accept', 'reject', 'invite', 'uninvite', 'makeAdmin', 'makeUser'] })
    async AdminActions(@Req() req: Request,@Param('channelId') channelId : number , @Param('userId') userId : number , @Param('action') action : 'ban' | 'mute' | 'kick' | 'unban' | 'unmute' | 'accept' | 'reject' | 'invite' | 'uninvite' | 'makeAdmin' | 'makeUser') {
        return await this.channelService.AdminActions(req, +channelId , +userId , action);
    }

    @UseGuards(JwtGuard)
    @Put('/user/:action')
    @ApiParam({ name: 'action', enum: ['join', 'leave', 'cancel', 'accept', 'reject'] })
    async UserActions(@Req() req: Request, @Body() miniChannel: miniChannelDto , @Param('action') action : 'join' | 'leave' | 'cancel' | 'accept' | 'reject') {
        return await this.channelService.UserActions(req, miniChannel.password, +miniChannel.channel_id , action);
    }
}
