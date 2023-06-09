import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { achievementDto } from './achievements.dto';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
	constructor(private readonly achievementsService: AchievementsService) {}
	
	@UseGuards(JwtGuard)
	@Get()
	async getAchievements(){
		return await this.achievementsService.getAchievements();
	}

	@UseGuards(JwtGuard)
	@Get('log')
	async getAchievementsLog(@Req() req: Request){
		return await this.achievementsService.getAchievementsLog(req);
	}
	
	@UseGuards(JwtGuard)
	@Post()
	async updateAchievements(@Req() req: Request, @Body() achiev: achievementDto) {
		return this.achievementsService.updateAchievements(req, achiev);
	}
}