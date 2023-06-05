import { TwoFactorService } from './auth/2fa/twofactor.service';
import { TwoFactorController } from './auth/2fa/twofactor.controller';
import { TwoFactorModule } from './auth/2fa/twofactor.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LangModule } from './lang/lang.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TwoFactorModule, AuthModule, LangModule, UserModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule { }

