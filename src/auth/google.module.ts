import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt.module';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy],
})
export class GoogleModule {}