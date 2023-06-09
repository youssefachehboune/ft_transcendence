import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { historyDto } from './history.dto';

@ApiTags('history')
@ApiBadRequestResponse({description: 'The username provided belongs to no user'})
@Controller('history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@UseGuards(JwtGuard)
	@Get()
	async getHistory(@Req() req: Request) {
		return await this.historyService.getHistory(req);
	}

	@UseGuards(JwtGuard)
	@Post()
	async addMatch(@Req() req: Request, @Body() body: historyDto) {
		return await this.historyService.addMatch(req, body);
	}
}
