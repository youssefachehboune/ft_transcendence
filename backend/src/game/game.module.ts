import { AuthService } from 'src/auth/auth.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    controllers: [],
    providers: [GameService, GameGateway, AuthService, JwtService],
})
export class GameModule { }
