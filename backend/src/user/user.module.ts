import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserStatusGateway} from "./user-status.gateway";
import { AuthService } from '../auth/auth.service';
import { FriendsService } from '../friend/friends.service';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from 'src/notification/notification.service';


@Module({
  controllers: [UserController],
  providers: [UserService, UserStatusGateway, AuthService, FriendsService, JwtService, NotificationService]
})
export class UserModule {}
