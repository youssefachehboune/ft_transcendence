import { FriendsService } from 'src/friend/friends.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Module } from '@nestjs/common';
import { HistoryService } from 'src/history/history.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
    imports: [],
    controllers: [
        ProfileController,],
    providers: [
			NotificationService, ProfileService, FriendsService, HistoryService],
})
export class ProfileModule { }
