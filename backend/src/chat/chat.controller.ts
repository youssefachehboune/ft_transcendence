import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
	constructor(private readonly chatservice: ChatService) {}

	@Get()
	@UseGuards(JwtGuard)
	async getChat(@Req() req: Request) {
		return await this.chatservice.getChat(req);
	}
}
