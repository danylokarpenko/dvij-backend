// game-income.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStatisticEntity } from './gameStatistic.entity';
import { CreateGameStatisticDto } from './dto/create-gameStatistic.dto';
import { UpdateGameStatisticDto } from './dto/update-gameStatistic.dto';
import { FindAllGameStatisticsQueryDto } from './dto/find-gameStatistic-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';

@Injectable()
export class GameStatisticService {
  constructor(
    @InjectRepository(GameStatisticEntity)
    private gameStatisticRepository: Repository<GameStatisticEntity>,
  ) {}

  async create(
    createGameStatisticDto: CreateGameStatisticDto,
  ): Promise<GameStatisticEntity> {
    const gameStatistic = this.gameStatisticRepository.create(
      createGameStatisticDto,
    );
    return this.gameStatisticRepository.save(gameStatistic);
  }

  async findAll(
    query: FindAllGameStatisticsQueryDto,
  ): Promise<{ data: GameStatisticEntity[]; meta: MetaI }> {
    const { page = 1, limit = 10, amount, month, hitId, sort } = query;

    const whereCondition = {};
    if (amount !== undefined) whereCondition['amount'] = amount;
    if (month) whereCondition['month'] = month;
    if (hitId) whereCondition['hitId'] = hitId;

    // Sorting
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    } else {
      order['createdAt'] = 'DESC';
    }

    const [results, total] = await this.gameStatisticRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<GameStatisticEntity> {
    return this.gameStatisticRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateGameStatisticDto: UpdateGameStatisticDto,
  ): Promise<GameStatisticEntity> {
    await this.gameStatisticRepository.update(id, updateGameStatisticDto);
    return this.gameStatisticRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gameStatisticRepository.delete(id);
  }
}
