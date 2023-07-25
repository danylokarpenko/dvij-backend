import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { SkillsModule } from '../skills/skills.module';
import { EventsModule } from '../events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AchievementsModule } from '../achievements/achievements.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from '../WebSocketsModule/websockets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +process.env.TYPEORM_DATABASE_PORT,
      username: 'postgres',
      password: 'postgres',
      database: 'dvij',
      entities: ['dist/src/modules/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'], // Path to your migrations directory
      migrationsRun: true,
    }),
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UsersModule,
    SkillsModule,
    EventsModule,
    AchievementsModule,
    AuthModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
