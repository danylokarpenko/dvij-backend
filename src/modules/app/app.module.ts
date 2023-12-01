import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/user.module';
import { TraitsModule } from '../traits/traits.module';
import { EventsModule } from '../events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AchievementsModule } from '../achievements/achievement.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from '../places/places.module';
import { KingdomsModule } from '../kingdoms/kingdoms.module';
import { KingdomChatGatewayModule } from '../WebSocketModules/KingdomMessages/kingdom-chat.module';
import { KingdomMessagesModule } from '../kingdomMessages/kingdomMessages.module';

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
    TraitsModule,
    KingdomsModule,
    EventsModule,
    AchievementsModule,
    AuthModule,
    KingdomChatGatewayModule,
    PlacesModule,
    KingdomMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
