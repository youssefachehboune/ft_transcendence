import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config();
export type JwtPayload = { sub: number; email: string };
const prisma = new PrismaClient();
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
	const extractJwtFromCookie = (req) => {
	  let token = null;
	  if (req && req.cookies && req.cookies['jwt']) {
	    token = req.cookies['jwt'];
	  }
	  return token;
	};
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
		const user = await prisma.user.findUnique({
			where: {
				id: payload.sub
			}
		});
		if (user && user.role == 'BANNED')
			throw new BadRequestException('Your account has been deleted');
    return { id: payload.sub, email: payload.email };
  }
}