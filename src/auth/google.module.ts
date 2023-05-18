import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt.module';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtRefreshTokenStrategy } from './jwtrefresh.strategy';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy, JwtRefreshTokenStrategy],
})
export class GoogleModule {}