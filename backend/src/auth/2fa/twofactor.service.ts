/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class TwoFactorService {
    getHello(): string {
        return 'Hello 2FA!';
    }
}
