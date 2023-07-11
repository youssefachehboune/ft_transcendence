import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ChannelController,],
    providers: [
        ChannelService,],
})
export class ChannelModule { }
