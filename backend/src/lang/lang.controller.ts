import { Controller, Get, Header, Param, Req } from '@nestjs/common';
import { LangService } from './lang.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('language')
@Controller('lang')
export class LangController {
	constructor(private readonly langService: LangService) {}

	@Get(':key')
	@Header('Cache-Control', 'no-store')
	async getText(@Req() req: Request , @Param('key') key: string) {
		return await this.langService.getText(req, key);
	}
}
