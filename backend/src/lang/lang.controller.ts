import { Controller, Get, Header, Param, Req } from '@nestjs/common';
import { LangService } from './lang.service';
import { Request } from 'express';

@Controller('lang')
export class LangController {
	constructor(private readonly langService: LangService) {}

	@Get(':key')
	@Header('Cache-Control', 'no-cache')
	async getText(@Req() req: Request , @Param() params: any) {
		const ret = await this.langService.getText(req, params.key);
		return ret;
	}
}
