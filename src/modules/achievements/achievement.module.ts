// achievement.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { AchievementEntity } from './achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity])],
  providers: [AchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
