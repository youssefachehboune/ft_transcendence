import { Controller, Req, Get, UseGuards, Param } from '@nestjs/common';
import { Request } from 'express'
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
	constructor(private readonly chatservice: ChatService) {}

	@Get('room/:channel')
	@ApiParam({name: 'channel', type: 'string', description: 'the name of the channel'})
	@UseGuards(JwtGuard)
	async getChannelChat(@Req() req: Request, @Param('channel') channel: string) {
		return await this.chatservice.getChannelChat(req, channel);
	}

	@Get(':username')
	@UseGuards(JwtGuard)
	@ApiParam({name: 'username', type: 'string', description: 'the username of the friend'})
	async getChat(@Req() req: Request, @Param('username') username: string) {
		return await this.chatservice.getChat(req, username);
	}
}
