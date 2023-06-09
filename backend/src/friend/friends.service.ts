import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendsService {
    async getFriends() {
        return 'Hello From friends API!';
    }

}
