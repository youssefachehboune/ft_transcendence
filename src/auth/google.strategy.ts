import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }
	let _user = await prisma.user.findFirst({
	  where: { email: user.email},
	});
	if (!_user) {
	  _user = await prisma.user.create({
		data: {
		  email: user.email,
		  name: user.firstName,
		  profile: user.picture,
		},
	  });
	}
    return user;
  }
}