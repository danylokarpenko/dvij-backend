import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
// eslint-disable-next-line
const fs = require('fs');

import { EventEmitterModule } from '@nestjs/event-emitter';

import { TraitsModule } from '../traits/trait.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { AchievementModule } from '../achievements/achievement.module';

import { GameModule } from '../games/game.module';
import { IterationModule } from '../iterations/iteration.module';
import { TalentsModule } from '../talents/talent.module';
import { UserPayRateModule } from '../userPayRates/userPayRate.module';
import { GameUserModule } from '../gameUsers/gameUsers.module';
import { GameStatisticsModule } from '../gameStatistic/gameStatistic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 300, // time to live in seconds
        limit: 500, // maximum number of requests within the TTL
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_DATABASE_HOST,
      port: +process.env.TYPEORM_DATABASE_PORT,
      username: process.env.TYPEORM_DATABASE_USERNAME,
      password: process.env.TYPEORM_DATABASE_PASSWORD,
      database: process.env.TYPEORM_DATABASE_NAME,
      entities: ['dist/src/modules/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'], // Path to your migrations directory
      migrationsRun: true,
      ssl: {
        ca: fs.readFileSync(`/home/ec2-user/eu-west-3-bundle.pem`).toString(),
      },
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    TraitsModule,
    AchievementModule,
    AuthModule,
    GameModule,
    IterationModule,
    IterationModule,
    TalentsModule,
    TraitsModule,
    UserPayRateModule,
    GameUserModule,
    GameStatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
