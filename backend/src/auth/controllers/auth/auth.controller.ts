import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard, IntraAuthGuard } from '../../../auth/guards';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
    /**
     * Get /api/auth/login
     * This is the route the user will visit to authenticate
     */
    @Get('login')
    @UseGuards(IntraAuthGuard)
    login() {
        return;
    }
    
    /**
     * Get /api/auth/redirect
     * This is the redirect URL the OAuth2 Provider will call
    */
   @Get('redirect')
   @UseGuards(IntraAuthGuard)
   redirect(@Res() res: Response) {
       res.sendStatus(200);
    }
    
    /**
     * Get /api/auth/status
     * Retirieve the auth status
    */
   @Get('status')
   @UseGuards(AuthGuard('jwt'))
    status() {
        return 'ok';
    }

    /** 
     * Get /api/auth/logout
     * Logs the user out
    */
    @Get('logout')
    logout() {}

}