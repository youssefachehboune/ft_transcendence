import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ChannelService {
    getChannel(@Req() req: Request) {
        return { message: "getChannel" };
    }
}
