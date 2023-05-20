import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { config } from 'dotenv';
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';

config();
const prisma = new PrismaClient();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
	const extractJwtFromCookie = (req) => {
	  const token = null;
	  if (req && req.cookies && req.cookies['refresh']) {
	    return req.cookies['refresh'];
	  }
	  return token;
	};
    super({
      jwtFromRequest: extractJwtFromCookie,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
	let refreshtoken = request?.cookies?.refresh;
	const user = await prisma.user.findFirst({
		where: {id: payload.sub}
  	});
	if (user && bcrypt.compare(refreshtoken, user.refreshToken)) {
		return user;
	} else {
		throw new UnauthorizedException;
	}
  }
}
