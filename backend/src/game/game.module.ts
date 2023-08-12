import { AuthService } from 'src/auth/auth.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FriendsService } from 'src/friend/friends.service';
import { AchievementsService } from 'src/achievements/achievements.service';
import { HistoryService } from 'src/history/history.service';

@Module({
    imports: [],
    controllers: [],
    providers: [GameService, GameGateway, AuthService, JwtService, UserService, FriendsService, AchievementsService, HistoryService],
    exports: [GameService],
    
})
export class GameModule { }
