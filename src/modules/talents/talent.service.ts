// talent.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { TalentEntity } from './talent.entity';

import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { FindAllTalentsQueryDto } from './dto/find-all-talents-query.dto';

@Injectable()
export class TalentService {
  constructor(
    @InjectRepository(TalentEntity)
    private talentRepository: Repository<TalentEntity>,
  ) {}

  async create(createTalentDto: CreateTalentDto): Promise<TalentEntity> {
    const talent = this.talentRepository.create(createTalentDto);
    return this.talentRepository.save(talent);
  }

  async findAll(
    query: FindAllTalentsQueryDto,
  ): Promise<{ data: TalentEntity[]; meta: any }> {
    const { page = 1, limit = 10, key, name, sort = 'createdAt:DESC' } = query;

    const whereCondition = {};
    if (key) whereCondition['key'] = Like(`%${key}%`);
    if (name) whereCondition['name'] = Like(`%${name}%`);

    // Sorting
    const order = {};
    const [sortField, sortDirection] = (sort || 'createdAt:DESC').split(':');
    order[sortField] = sortDirection.toUpperCase();

    const [results, total] = await this.talentRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<TalentEntity> {
    return this.talentRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTalentDto: UpdateTalentDto,
  ): Promise<TalentEntity> {
    await this.talentRepository.update(id, updateTalentDto);
    return this.talentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.talentRepository.delete(id);
  }
}
