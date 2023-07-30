import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
	constructor( private readonly leaderboardService: LeaderboardService ) {}

	@Get('/pages')
	@UseGuards(JwtGuard)
	async getNumberOfPages() {
		return await this.leaderboardService.getNumberOfPages();
	}

	@Get(':page')
	@ApiParam({name: 'page', type: String, description: 'the number of the page to display'})
	@UseGuards(JwtGuard)
	async getLeaderboard(@Param('page') page: number){
		return await this.leaderboardService.getLeaderboard(page);
	}
}
