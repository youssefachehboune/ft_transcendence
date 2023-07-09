import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { historyDto } from './history.dto';

@ApiTags('history')
@ApiBadRequestResponse({description: 'invalid username'})
@Controller('history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@UseGuards(JwtGuard)
	@Get('lastMatches')
	async getLastMatches(@Req() req: Request) {
		return await this.historyService.getHistory(req, 'ALL', 3);
	}

	@Get(':filter')
	@UseGuards(JwtGuard)
	@ApiBadRequestResponse({description: "the filter must be either 'ALL' or 'WON' or 'LOST'"})
	@ApiParam({name: 'filter', enum: ['WON', 'LOST', 'ALL'], type: 'string', description: 'the type of the matches'})
	async getHistory(@Req() req: Request, @Param('filter') filter: 'WON' | 'LOST' | 'ALL') {
		if (filter != 'WON' && filter != 'LOST' && filter != 'ALL')
			throw new BadRequestException("the filter must be either 'ALL' or 'WON' or 'LOST'");
		return await this.historyService.getHistory(req, filter);
	}

	@UseGuards(JwtGuard)
	@Post()
	async addMatch(@Req() req: Request, @Body() body: historyDto) {
		return await this.historyService.addMatch(req, body);
	}
}
