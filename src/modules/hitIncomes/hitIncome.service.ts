// hit-income.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HitIncomeEntity } from './hitIncome.entity';
import { CreateHitIncomeDto } from './dto/create-hitIncome.dto';
import { UpdateHitIncomeDto } from './dto/update-hitIncome.dto';
import { FindAllHitIncomesQueryDto } from './dto/find-all-hit-incomes-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';

@Injectable()
export class HitIncomeService {
  constructor(
    @InjectRepository(HitIncomeEntity)
    private hitIncomeRepository: Repository<HitIncomeEntity>,
  ) {}

  async create(
    createHitIncomeDto: CreateHitIncomeDto,
  ): Promise<HitIncomeEntity> {
    const hitIncome = this.hitIncomeRepository.create(createHitIncomeDto);
    return this.hitIncomeRepository.save(hitIncome);
  }

  async findAll(
    query: FindAllHitIncomesQueryDto,
  ): Promise<{ data: HitIncomeEntity[]; meta: MetaI }> {
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

    const [results, total] = await this.hitIncomeRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<HitIncomeEntity> {
    return this.hitIncomeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateHitIncomeDto: UpdateHitIncomeDto,
  ): Promise<HitIncomeEntity> {
    await this.hitIncomeRepository.update(id, updateHitIncomeDto);
    return this.hitIncomeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.hitIncomeRepository.delete(id);
  }
}
