import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [FriendsController],
    providers: [FriendsService],
})
export class FriendsModule { }
