import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthService } from './jwt.service';

@Controller('google')
export class GoogleController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
	const { accessToken, refreshToken } = await this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    }).cookie('refresh', refreshToken, {
	  httpOnly: true,
	  sameSite: 'lax',
	});
    return res.send({
	  accesstoken: accessToken,
	  refreshtoken: refreshToken
	});
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: Request) {
	console.log(req.user);
	return req.user;
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  refresh(@Req() req: Request) {
	return this.jwtAuthService.refreshToken(req.user['email'], req.user['refreshToken']);
  }
}