import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [GameService, GameGateway],
})
export class GameModule { }
