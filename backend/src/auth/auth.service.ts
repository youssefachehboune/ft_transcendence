import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
import { config } from 'dotenv';
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { TokenError } from 'passport-oauth2';

config();
const prisma = new PrismaClient();

@Catch(TokenError)
export class TokenErrorFilter implements ExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.name === 'TokenError') {
      if (exception.message === 'Malformed auth code.') {
        response.status(400).json({ error: 'Malformed auth code' });
      } else if (exception.message === 'Bad Request') {
        response.status(400).json({ error: 'Bad Request' });
      } else {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
	const accesstoken = this.jwtService.sign(payload, {
	  secret: process.env.JWT_SECRET,
	  expiresIn: process.env.JWT_EXPIRATION_TIME
	});
	const refreshtoken = this.jwtService.sign(payload,{
	  secret: process.env.JWT_REFRESH_SECRET,
	  expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME
	});
	await prisma.user.update({
	  where: { email: user.email },
	  data: { refreshToken: await bcrypt.hash(refreshtoken, 10) }
	});
	return { accessToken: accesstoken, refreshToken: refreshtoken };
  }

  async refreshToken(email:string, refreshtoken:string) {
	const user = await prisma.user.findUnique({
	  where: { email: email },
	});
	if (!user) {
	  throw new ForbiddenException('Forbidden');
	}
	if (!bcrypt.compare(user.refreshToken, refreshtoken)) {
	  throw new ForbiddenException('Forbidden');
	}
    const payload: JwtPayload = { email: user.email, sub: user.id };
	const accesstoken = this.jwtService.sign(payload, {
	  secret: process.env.JWT_SECRET,
	  expiresIn: process.env.JWT_EXPIRATION_TIME
	});
	return { newaccessToken: accesstoken };
  }

  async logout(email: string) {
	await prisma.user.update({
      where: { email: email },
      data: { refreshToken: null },
    });
  }
}