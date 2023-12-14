// game-income.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameIncomeEntity } from './gameIncomes.entity';
import { CreateGameIncomeDto } from './dto/create-gameIncome.dto';
import { UpdateGameIncomeDto } from './dto/update-gameIncome.dto';
import { FindAllGameIncomesQueryDto } from './dto/find-all-gameIncome-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';

@Injectable()
export class GameIncomeService {
  constructor(
    @InjectRepository(GameIncomeEntity)
    private gameIncomeRepository: Repository<GameIncomeEntity>,
  ) {}

  async create(
    createGameIncomeDto: CreateGameIncomeDto,
  ): Promise<GameIncomeEntity> {
    const gameIncome = this.gameIncomeRepository.create(createGameIncomeDto);
    return this.gameIncomeRepository.save(gameIncome);
  }

  async findAll(
    query: FindAllGameIncomesQueryDto,
  ): Promise<{ data: GameIncomeEntity[]; meta: MetaI }> {
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

    const [results, total] = await this.gameIncomeRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<GameIncomeEntity> {
    return this.gameIncomeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateGameIncomeDto: UpdateGameIncomeDto,
  ): Promise<GameIncomeEntity> {
    await this.gameIncomeRepository.update(id, updateGameIncomeDto);
    return this.gameIncomeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gameIncomeRepository.delete(id);
  }
}
