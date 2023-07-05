import { Module } from '@nestjs/common';
import {TopPlayerController} from './topPlayer.controller';
import {TopPlayerService} from './topPlayer.service';

@Module({
    controllers: [TopPlayerController],
    providers: [TopPlayerService],
})
export class topPlayerModule {}