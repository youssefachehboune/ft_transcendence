import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule {}
