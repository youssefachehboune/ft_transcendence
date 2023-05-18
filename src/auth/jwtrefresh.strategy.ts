import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { config } from 'dotenv';
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from './jwt.strategy';

config();
const prisma = new PrismaClient();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const refreshtoken = request.header('Authorization').split(' ')[1];
	const user = await prisma.user.findFirst({
		where: {id: payload.sub}
  	});
	if (user && refreshtoken === user.refreshToken) {
		return user;
	} else {
		throw new UnauthorizedException;
	}
  }
}
