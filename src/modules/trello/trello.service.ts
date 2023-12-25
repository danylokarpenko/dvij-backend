import { Injectable } from '@nestjs/common';

import { FindAllTrelloQueryDto } from './dto/find-all-trello-query.dto';
import { GameService } from '../games/game.service';

import { getBoardListsByBoardId } from 'src/api/APIs/Board';

@Injectable()
export class TrelloService {
  constructor(private gameService: GameService) {}

  async getIsNewTasksInGame(query: FindAllTrelloQueryDto) {
    const { gameId } = query;
    const game = await this.gameService.findOne(gameId);
    const res = await getBoardListsByBoardId(game.trelloBoardId);

    return game;
  }
}
