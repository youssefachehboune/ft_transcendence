import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserStatusGateway} from "./user-status.gateway";
import { AuthService } from '../auth/auth.service';
import { FriendsService } from '../friend/friends.service';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from 'src/notification/notification.service';
import { GameService } from 'src/game/game.service';
import { AchievementsService } from 'src/achievements/achievements.service';
import { HistoryService } from 'src/history/history.service';


@Module({
  controllers: [UserController],
  providers: [UserService, UserStatusGateway, AuthService, FriendsService, JwtService, NotificationService, GameService, AchievementsService, HistoryService],
  exports: [UserService]
})
export class UserModule {}
