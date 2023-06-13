import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'

@ApiTags('notifications')
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(JwtGuard)
	@Get()
	async getNotifications(@Req() req: Request) {
		return await this.notificationService.getNotifications(req);
	}

}
