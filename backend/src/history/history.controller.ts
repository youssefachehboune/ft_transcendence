import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('history')
@ApiBadRequestResponse({description: 'invalid username'})
@Controller('history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@UseGuards(JwtGuard)
	@Get('lastMatches')
	async getLastMatches(@Req() req: Request) {
		return await this.historyService.getHistory(req, 1, 'ALL', 2);
	}

	@Get('pages')
	@UseGuards(JwtGuard)
	async getNumberOfPages(@Req() req: Request) {
		return await this.historyService.getNumberOfPages(req);
	}
	
	@Get(':filter/:page')
	@UseGuards(JwtGuard)
	@ApiBadRequestResponse({description: "the filter must be either 'ALL' or 'WON' or 'LOST'"})
	@ApiParam({name: 'filter', enum: ['WON', 'LOST', 'ALL'], type: 'string', description: 'the type of the matches'})
	@ApiParam({name: 'page', type: Number, description: 'the number of the page to display'})
	async getHistory(@Req() req: Request, @Param('filter') filter: 'WON' | 'LOST' | 'ALL', @Param('page') page: number) {
		if (filter != 'WON' && filter != 'LOST' && filter != 'ALL')
			throw new BadRequestException("the filter must be either 'ALL' or 'WON' or 'LOST'");
		return await this.historyService.getHistory(req, page, filter);
	}
}
