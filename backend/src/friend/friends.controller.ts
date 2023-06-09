import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}
    
    @Get()
    async getFriends() {
        return await this.friendsService.getFriends();
    }
}
