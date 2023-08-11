import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config()
@Injectable()
export class AuthMiddleware implements NestMiddleware {

	constructor() {}

  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    const accessToken = req.cookies['jwt'];
    if (!accessToken) {
      return res.send('No access token found');
    }
		
    try {
			jwt.verify(accessToken, process.env.JWT_SECRET);
      next();
    } catch (error) {
			if (error.message === 'jwt expired') {
				try {
					res.redirect('http://localhost:3000/refresh/')
				} catch(err) {
					console.log(err.message);
				}
				next();
      }
    }
  }
}
