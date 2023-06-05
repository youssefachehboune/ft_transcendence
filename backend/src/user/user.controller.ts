import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Get(':id')
	@UseGuards(JwtGuard)
	async getUserData(@Req() req: Request,  @Param() params: any) {
		return await this.userService.getUserData(req, params);
	}

	@Put()
	@UseGuards(JwtGuard)
	async updateUser(@Req() req: Request, @Body() data: any) {
		return await this.userService.updateUser(req, data);
	}
}
