import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './games.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), UsersModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
