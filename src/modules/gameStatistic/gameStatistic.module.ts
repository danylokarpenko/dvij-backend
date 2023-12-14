import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStatisticEntity } from './gameStatistic.entity';
import { GameStatisticController } from './gameStatistic.controller';
import { GameStatisticService } from './gameStatistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameStatisticEntity])],
  controllers: [GameStatisticController],
  providers: [GameStatisticService],
})
export class GameStatisticsModule {}
