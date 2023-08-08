import { AuthService } from 'src/auth/auth.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FriendsService } from 'src/friend/friends.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
    imports: [],
    controllers: [],
    providers: [GameService, GameGateway, AuthService, JwtService, UserService, FriendsService, NotificationService],
    exports: [GameService],
    
})
export class GameModule { }
