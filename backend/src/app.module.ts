import { ProfileModule } from './profile/profile.module';
import { FriendsModule } from './friend/friends.module';
import { SearchModule } from './search/search.module';
import { TwoFactorModule } from './auth/2fa/twofactor.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LangModule } from './lang/lang.module';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { AchievementsModule } from './achievements/achievements.module';
import { NotificationModule } from './notification/notification.module';
import { topPlayerModule } from './top-player/topPlayer.module';

@Module({
  imports: [ ProfileModule, FriendsModule, AchievementsModule, HistoryModule, SearchModule, TwoFactorModule, AuthModule, LangModule, UserModule, NotificationModule, topPlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }