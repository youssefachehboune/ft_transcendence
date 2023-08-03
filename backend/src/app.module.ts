import { GameModule } from './game/game.module';
import { ProfileModule } from './profile/profile.module';
import { FriendsModule } from './friend/friends.module';
import { SearchModule } from './search/search.module';
import { TwoFactorModule } from './auth/2fa/twofactor.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LangModule } from './lang/lang.module';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { AchievementsModule } from './achievements/achievements.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { topPlayerModule } from './top-player/topPlayer.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ChannelModule } from './channel/channel.module';
import { AuthMiddleware } from './auth/auth.middleware';


@Module({
  imports: [ChannelModule, ProfileModule, FriendsModule, AchievementsModule, HistoryModule, SearchModule, TwoFactorModule, AuthModule, LangModule, UserModule, NotificationModule, ChatModule, topPlayerModule, LeaderboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
				{ path: 'intra', method: RequestMethod.GET },
				{ path: 'google', method: RequestMethod.GET },
				{ path: 'intra/redirect', method: RequestMethod.GET },
				{ path: 'google/redirect', method: RequestMethod.GET },
				{ path: 'lang/:key', method: RequestMethod.GET },
				{ path: 'refresh', method: RequestMethod.GET },
			)
      .forRoutes('*');
  }
}