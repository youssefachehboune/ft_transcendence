import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwtrefresh.guard';
import { IntraGuard } from './guards/intra.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
	const { accessToken, refreshToken, firstTime, twoFactorEnabled } = await this.AuthService.login(req.user);
	res.cookie('jwt', accessToken, {
		httpOnly: true,
		sameSite: 'lax',
	}).cookie('refresh', refreshToken, {
		httpOnly: true,
		sameSite: 'lax',
	})
		if (firstTime)
			res.redirect("http://localhost:3001/User-Info")
		else if (twoFactorEnabled)
			res.redirect("http://localhost:3001/authSignin")
		else
			res.redirect("http://localhost:3001/Home")
  }

  @Get('intra')
  @UseGuards(IntraGuard)
  async intraAuth() {}

  @Get('intra/redirect')
  @UseGuards(IntraGuard)
  async intraAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken, firstTime, twoFactorEnabled } = await this.AuthService.login(req.user);
		res.cookie('jwt', accessToken, {
			httpOnly: true,
			sameSite: 'lax',
		}).cookie('refresh', refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
		})
		if (firstTime)
			res.redirect("http://localhost:3001/User-Info")
		else if (twoFactorEnabled)
			res.redirect("http://localhost:3001/authSignin")
		else
			res.redirect("http://localhost:3001/Home")
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
		const { newaccessToken : accessToken } = await this.AuthService.refreshToken(req.user['email'], req.cookies['refresh']);
		res.cookie('jwt', accessToken, {
			httpOnly: true,
			sameSite: 'lax',
		});
		req.cookies['jwt'] = accessToken;
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
		res.redirect('http://localhost:3001/')
  }

  @Get('singin')
  @UseGuards(JwtGuard)
  check_cookie(@Req() req: Request, @Res() res: Response) {
	if (req.cookies['jwt'])
		res.send({ logged: true });
	else
		res.send({ logged: false });
  }
}