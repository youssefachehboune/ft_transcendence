import { Module } from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';
import { TwoFactorController } from './twofactor.controller';

@Module({
    imports: [],
    controllers: [TwoFactorController],
    providers: [TwoFactorService],
})
export class TwoFactorModule {}
