import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @UseGuards(JwtGuard)
    @Get()
    async getChannel(@Req() req: Request) {
        return await this.channelService.getChannel(req);
    }
}
