import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './games.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private gamesRepository: Repository<GameEntity>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gamesRepository.create(createGameDto).save();
  }

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);
    const mappedGame = Object.assign(game, updateGameDto);
    return this.gamesRepository.update(id, mappedGame);
  }

  remove(id: number) {
    return this.gamesRepository.delete(id);
  }
}
