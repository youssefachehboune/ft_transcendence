import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwtrefresh.guard';

@Controller()
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
	const { accessToken, refreshToken } = await this.AuthService.login(req.user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    }).cookie('refresh', refreshToken, {
	  httpOnly: true,
	  sameSite: 'lax',
	})
    return res.send({
	  accesstoken: accessToken,
	  refreshtoken: refreshToken
	});
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Req() req: Request) {
	return req.user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
	const { newaccessToken : accessToken } = await this.AuthService.refreshToken(req.user['email'], req.user['refreshToken']);
	res.cookie('jwt', accessToken, {
	  httpOnly: true,
	  sameSite: 'lax',
	});
	return res.send({
	  accesstoken: accessToken
	});
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
	res.clearCookie('jwt');
	res.clearCookie('refresh');
	await this.AuthService.logout(req.user['email']);
	res.send({ msg: 'Logged out!' });
  }
}