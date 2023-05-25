import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwtrefresh.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { IntraStrategy } from './strategies/intra.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService ,JwtAuthStrategy, GoogleStrategy, JwtRefreshTokenStrategy, IntraStrategy],
})
export class AuthModule {}