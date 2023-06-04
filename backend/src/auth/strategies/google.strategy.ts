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
  async getUsername(username: string): Promise<string> {
    const user = await prisma.userProfile.findUnique({
      where: { username }
    })
    if(user) {        
      username +=  Math.floor(Math.random() * 9);
	  return this.getUsername(username);
    }
    return username;
  }
  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, emails, photos } = profile
    const googleuser = {
      email: emails[0].value,
      picture: photos[0].value,
			firstName: name.givenName,
      accessToken,
    }
	let dbuser = await prisma.user.findUnique({
	  where: { email: googleuser.email},
	});
	if (!dbuser) {
	  dbuser = await prisma.user.create({
		data: {
		  email: googleuser.email,
		  twoFactorEnabled: false,
		  role: 'USER',
		},
	  });
	  let gusername = await this.getUsername(googleuser.email.substring(0, googleuser.email.indexOf('@')));
	  await prisma.userProfile.create({
		  data: {
			  user_id: dbuser.id,
			  username: gusername,
				firstName: googleuser.firstName,
			  bio: "",
			  location: "",
			  avatar: googleuser.picture,
			  level: 0,
		  }
	  })
	}
    return googleuser;
  }
}
