// trait.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { TraitEntity } from './trait.entity';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';

import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';
import { FindAllTraitsQueryDto } from './dto/find-all-traits-query.dto';

@Injectable()
export class TraitService {
  constructor(
    @InjectRepository(TraitEntity)
    private traitRepository: Repository<TraitEntity>,
  ) {}

  async create(createTraitDto: CreateTraitDto): Promise<TraitEntity> {
    const trait = this.traitRepository.create(createTraitDto);
    return this.traitRepository.save(trait);
  }

  async findAll(
    query: FindAllTraitsQueryDto,
  ): Promise<{ data: TraitEntity[]; meta: MetaI }> {
    const { name, sort = 'createdAt:DESC', page = 1, limit = 10 } = query;

    const whereCondition = {};
    if (name) whereCondition['name'] = Like(`%${name}%`);

    const order = {};
    const [sortField, sortDirection] = sort.split(':');
    order[sortField] = sortDirection.toUpperCase();

    const [results, total] = await this.traitRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<TraitEntity> {
    return this.traitRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTraitDto: UpdateTraitDto,
  ): Promise<TraitEntity> {
    await this.traitRepository.update(id, updateTraitDto);
    return this.traitRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.traitRepository.delete(id);
  }
}
