import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express'


@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get(':username')
    @UseGuards(JwtGuard)
    async search(@Req() req: Request, @Param('username') username: string) {
        return await this.searchService.search(req, username);
    }

}
