import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Module } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';

@Module({
    imports: [],
    controllers: [FriendsController],
    providers: [NotificationService, FriendsService],
})
export class FriendsModule { }
