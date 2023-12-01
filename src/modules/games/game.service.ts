// game.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { GameEntity } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FindAllGamesQueryDto } from './dto/find-all-games-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';

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
      limit = 10,
      name,
      releaseDate,
      lastPatchDate,
      cpi,
      pt,
      retD1,
      retD7,
      dau,
      installs,
      malesGenderPercentage,
      minAge,
      maxAge,
      sort,
    } = query;

    const whereCondition = [];
    if (name) whereCondition.push({ name: Like(`%${name}%`) });
    if (releaseDate) whereCondition.push({ releaseDate });
    if (lastPatchDate) whereCondition.push({ lastPatchDate });
    if (cpi !== undefined) whereCondition.push({ cpi });
    if (pt !== undefined) whereCondition.push({ pt });
    if (retD1 !== undefined) whereCondition.push({ retD1 });
    if (retD7 !== undefined) whereCondition.push({ retD7 });
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
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<GameEntity> {
    return this.gameRepository.findOneBy({ id });
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<GameEntity> {
    await this.gameRepository.update(id, updateGameDto);
    return this.gameRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
