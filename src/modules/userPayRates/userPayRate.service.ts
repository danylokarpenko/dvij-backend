// user-pay-rates.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllUserPayRatesQueryDto } from './dto/find-all-user-pay-rates-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';
import { UserPayRateEntity } from './userPayRate.entity';
import { UpdateUserPayRateDto } from './dto/update-userPayRate.dto';
import { CreateUserPayRateDto } from './dto/create-userPayRate.dto';

@Injectable()
export class UserPayRatesService {
  constructor(
    @InjectRepository(UserPayRateEntity)
    private userPayRateRepository: Repository<UserPayRateEntity>,
  ) {}

  async create(
    createUserPayRateDto: CreateUserPayRateDto,
  ): Promise<UserPayRateEntity> {
    const userPayRate = this.userPayRateRepository.create(createUserPayRateDto);
    return this.userPayRateRepository.save(userPayRate);
  }

  async findAll(
    query: FindAllUserPayRatesQueryDto,
  ): Promise<{ data: UserPayRateEntity[]; meta: MetaI }> {
    const {
      userId,
      month,
      sort = 'createdAt:DESC',
      page = 1,
      limit = 10,
    } = query;

    const whereCondition = {};
    if (userId) whereCondition['user'] = userId;
    if (month) whereCondition['month'] = month;

    // Sorting
    const order = {};
    const [sortField, sortDirection] = (sort || 'createdAt:DESC').split(':');
    order[sortField] = sortDirection.toUpperCase();

    const [results, total] = await this.userPayRateRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }
  async findOne(id: number): Promise<UserPayRateEntity> {
    return this.userPayRateRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateUserPayRateDto: UpdateUserPayRateDto,
  ): Promise<UserPayRateEntity> {
    await this.userPayRateRepository.update(id, updateUserPayRateDto);
    return this.userPayRateRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userPayRateRepository.delete(id);
  }
}
