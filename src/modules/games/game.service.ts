// game.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { GameEntity } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FindAllGamesQueryDto } from './dto/find-all-games-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';
import { getBoardListsByBoardId } from 'src/api/APIs/Board';
import { FindAllTrelloQueryDto } from '../trello/dto/find-all-trello-query.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<GameEntity> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async findAll(
    query: FindAllGamesQueryDto,
  ): Promise<{ data: GameEntity[]; meta: MetaI }> {
    const {
      page = 1,
      limit = 100,
      name,
      releaseDate,
      lastPatchDate,
      cpi,
      pt,
      d1,
      d7,
      dau,
      installs,
      malesGenderPercentage,
      minAge,
      maxAge,
      sort,
      isHit,
    } = query;

    const whereCondition = [];
    if (name) whereCondition.push({ name: Like(`%${name}%`) });
    if (query.hasOwnProperty('isHit')) whereCondition.push({ isHit });
    if (releaseDate) whereCondition.push({ releaseDate });
    if (lastPatchDate) whereCondition.push({ lastPatchDate });
    if (cpi !== undefined) whereCondition.push({ cpi });
    if (pt !== undefined) whereCondition.push({ pt });
    if (d1 !== undefined) whereCondition.push({ d1 });
    if (d7 !== undefined) whereCondition.push({ d7 });
    if (dau !== undefined) whereCondition.push({ dau });
    if (installs !== undefined) whereCondition.push({ installs });
    if (malesGenderPercentage !== undefined)
      whereCondition.push({ malesGenderPercentage });
    if (minAge !== undefined) whereCondition.push({ minAge });
    if (maxAge !== undefined) whereCondition.push({ maxAge });
    // Sorting
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    } else {
      order['createdAt'] = 'DESC';
    }
    const [results, total] = await this.gameRepository.findAndCount({
      where: whereCondition,
      order,
      take: limit,
      skip: (page - 1) * limit,
      relations: ['gameUsers', 'gameUsers.user'],
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<GameEntity> {
    const game = await this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.gameUsers', 'gameUsers')
      .leftJoinAndSelect('gameUsers.user', 'user')
      .leftJoinAndSelect('game.gameStatistics', 'gameStatistics')
      .leftJoinAndSelect('game.iterations', 'iterations')
      .leftJoinAndSelect('iterations.creator', 'creator')
      .where('game.id = :id', { id })
      .orderBy({
        'iterations.index': 'ASC', // Sorting iterations by createdAt in descending order
      })
      .getOne();
    // const isNewTasksInTrello = await this.getIsNewTasksInGame({
    //   gameId: game.id,
    // });

    // console.log('isNewTasksInTrello', isNewTasksInTrello);

    return game;
  }

  async getIsNewTasksInGame(query: FindAllTrelloQueryDto) {
    try {
      const { gameId } = query;
      const game = await this.gameRepository.findOneBy({ id: gameId });
      const res = await getBoardListsByBoardId(game.trelloBoardId);

      return res;
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<GameEntity> {
    await this.gameRepository.update(id, updateGameDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
