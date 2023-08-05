import { Body, Controller, Delete, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { UserDto } from './user.dto'
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
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

	@Delete()
	@UseGuards(JwtGuard)
	async deleteAccount(@Req() req: Request, @Res() res: Response) {
		await this.userService.deleteAccount(req);
		res.redirect('http://localhost:3001/')
	}
}
