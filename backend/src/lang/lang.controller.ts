import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { LangService } from './lang.service';
import { Request } from 'express';

@Controller('lang')
export class LangController {
	constructor(private readonly langService: LangService) {}

	@Get(':key')
	async getText(@Req() req: Request , @Param() params: any) {
		const ret = await this.langService.getText(req, params.key);
		return ret;
	}
}
