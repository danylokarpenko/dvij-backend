import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitsModule } from '../traits/trait.module';

import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { AchievementModule } from '../achievements/achievement.module';

@Module({
  imports: [
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
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UserModule,
    TraitsModule,
    AchievementModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
