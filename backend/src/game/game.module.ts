import { AuthService } from 'src/auth/auth.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FriendsService } from 'src/friend/friends.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserStatusGateway } from 'src/user/user-status.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [GameService, GameGateway, AuthService, JwtService, UserService, FriendsService, NotificationService, UserStatusGateway],
    exports: [GameService],
    
})
export class GameModule { }
