import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { EventEmitterModule } from '@nestjs/event-emitter';

import { TraitsModule } from '../traits/trait.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { AchievementModule } from '../achievements/achievement.module';
import { HitModule } from '../hits/hit.module';
import { GameModule } from '../games/game.module';
import { HitIncomesModule } from '../hitIncomes/hitIncome.module';
import { IterationModule } from '../iterations/iteration.module';
import { TalentsModule } from '../talents/talent.module';
import { UserPayRateModule } from '../userPayRates/userPayRate.module';
import { UserHitsModule } from '../userHits/userHits.module';

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
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    TraitsModule,
    AchievementModule,
    AuthModule,
    HitModule,
    GameModule,
    HitIncomesModule,
    IterationModule,
    IterationModule,
    TalentsModule,
    TraitsModule,
    UserPayRateModule,
    UserHitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
