import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { achievementDto } from './achievements.dto';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
	constructor(private readonly achievementsService: AchievementsService) {}

	@UseGuards(JwtGuard)
	@Get('last')
	async getLastAchievements(@Req() req: Request){
		return await this.achievementsService.getAchievements(req, 'COMPLETE', 3);
	}

	@UseGuards(JwtGuard)
	@Get(':type')
	@ApiBadRequestResponse({description: 'You have to choose between COMPLETE, UNCOMPLETE and ALL as the achievements type'})
	@ApiParam({name: 'type', enum: ['ALL', 'COMPLETE', 'UNCOMPLETE'], type: 'string', description: 'the type of the achievements'})
	async getAchievements(@Req() req: Request, @Param('type') type: 'ALL' | 'COMPLETE' | 'UNCOMPLETE') {
		if (type !== 'ALL' && type !== 'COMPLETE' && type !== 'UNCOMPLETE')
			throw new BadRequestException('You have to choose between COMPLETE, UNCOMPLETE and ALL as the achievements type')
		return await this.achievementsService.getAchievements(req, type);
	}

	@UseGuards(JwtGuard)
	@Post()
	async updateAchievements(@Req() req: Request, @Body() achiev: achievementDto) {
		return await this.achievementsService.updateAchievements(req, achiev);
	}
}
