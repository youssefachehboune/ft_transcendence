import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

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
    @Get('invitations')
    async getInvitations(@Req() req: Request) {
        return await this.channelService.getInvitations(req);
    }
}
