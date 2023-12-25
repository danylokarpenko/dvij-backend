// trello.module.ts

import { Module } from '@nestjs/common';

import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';

import { GameService } from '../games/game.service';
import { GameModule } from '../games/game.module';

@Module({
  imports: [GameModule],
  controllers: [TrelloController],
  providers: [TrelloService, GameService],
})
export class TrelloModule {}
