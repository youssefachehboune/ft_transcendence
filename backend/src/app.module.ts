import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LangModule } from './lang/lang.module';

@Module({
  imports: [AuthModule, LangModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

