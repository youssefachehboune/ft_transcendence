import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { AtStrategy, IntraStrategy, RtStrategy } from './strategy';
import { PrismaService } from '../prisma/prisma.service';
import { SessionSerializer } from './utils/Serializer';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatedGuard } from './guards';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [IntraStrategy, PrismaService, SessionSerializer, AtStrategy, RtStrategy,
  {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }]
})
export class AuthModule {}
