import { Controller, Get, UseGuards } from "@nestjs/common";
import { TopPlayerService } from './topPlayer.service';
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guards/jwt.guard";

@ApiTags('top-player')
@Controller('top-player')
export class TopPlayerController {
    constructor(private readonly topPlayerService: TopPlayerService) { }

    @Get()
    @UseGuards(JwtGuard)
    async getTopPlayer(): Promise<object> {
        return await this.topPlayerService.getTopPlayer();
    }
}