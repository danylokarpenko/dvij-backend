// hit.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HitEntity } from './hit.entity';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';
import { FindAllHitsQueryDto } from './dto/find-all-hits-query.dto';

@Injectable()
export class HitService {
  constructor(
    @InjectRepository(HitEntity)
    private hitRepository: Repository<HitEntity>,
  ) {}

  async create(createHitDto: CreateHitDto): Promise<HitEntity> {
    const hit = this.hitRepository.create(createHitDto);
    return this.hitRepository.save(hit);
  }

  async findAll(
    query: FindAllHitsQueryDto,
  ): Promise<{ data: HitEntity[]; meta: any }> {
    const {
      page = 1,
      limit = 10,
      name,
      releaseDate,
      lastPatchDate,
      installs,
      dau,
      malesGenderPercentage,
      minAge,
      maxAge,
      sort,
    } = query;

    const whereCondition = [];
    if (name) whereCondition.push({ name: Like(`%${name}%`) });
    if (releaseDate) whereCondition.push({ releaseDate });
    if (lastPatchDate) whereCondition.push({ lastPatchDate });
    if (installs !== undefined) whereCondition.push({ installs });
    if (dau !== undefined) whereCondition.push({ dau });
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

    const [results, total] = await this.hitRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<HitEntity> {
    return this.hitRepository.findOneBy({ id });
  }

  async update(id: number, updateHitDto: UpdateHitDto): Promise<HitEntity> {
    await this.hitRepository.update(id, updateHitDto);
    return this.hitRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.hitRepository.delete(id);
  }
}
