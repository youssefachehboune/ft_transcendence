import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { config } from 'dotenv';
import { PrismaClient } from "@prisma/client";

config();
const prisma = new PrismaClient();

@Injectable()
export class JwtAuthService {
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
	  data: { refreshToken: refreshtoken }
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
	if (user.refreshToken != refreshtoken) {
	  throw new ForbiddenException('Forbidden');
	}
	return this.login(user);
  }
}