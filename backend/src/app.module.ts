import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PassportModule.register({ session: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
