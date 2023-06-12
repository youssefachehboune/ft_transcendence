import { Module } from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [AchievementsController],
  providers: [NotificationService, AchievementsService]
})
export class AchievementsModule {}
