import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { UserDto } from './user.dto'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Get()
	@UseGuards(JwtGuard)
	async getUserData(@Req() req: Request) {
		return await this.userService.getUserData(req);
	}

	@Put()
	@UseGuards(JwtGuard)
	async updateUser(@Req() req: Request, @Body() data: UserDto) {
		return await this.userService.updateUser(req, data);
	}
}
