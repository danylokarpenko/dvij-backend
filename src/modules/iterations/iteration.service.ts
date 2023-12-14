// iteration.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IterationEntity } from './iteration.entity';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';
import { FindAllIterationsQueryDto } from './dto/find-all-iterations-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@Injectable()
export class IterationService {
  constructor(
    @InjectRepository(IterationEntity)
    private iterationRepository: Repository<IterationEntity>,
  ) {}

  async create(
    createIterationDto: CreateIterationDto,
    req: IRequest,
  ): Promise<IterationEntity> {
    const iteration = this.iterationRepository.create({
      ...createIterationDto,
      creatorId: req.user.id,
    });
    const saved = await this.iterationRepository.save(iteration);
    return this.iterationRepository.findOne({
      where: { id: saved.id },
      relations: ['creator'],
    });
  }

  async findAll(
    query: FindAllIterationsQueryDto,
  ): Promise<{ data: IterationEntity[]; meta: MetaI }> {
    const {
      page = 1,
      limit = 10,
      creatorId,
      description,
      isApproved,
      hitId,
      gameId,
      sort,
    } = query;

    const whereCondition = {};
    if (creatorId !== undefined) whereCondition['creatorId'] = creatorId;
    if (description) whereCondition['description'] = description;
    if (isApproved) whereCondition['isApproved'] = isApproved;
    if (hitId !== undefined) whereCondition['hitId'] = hitId;
    if (gameId !== undefined) whereCondition['gameId'] = gameId;

    // Sorting
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    } else {
      order['createdAt'] = 'DESC';
    }

    const [results, total] = await this.iterationRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<IterationEntity> {
    return this.iterationRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateIterationDto: UpdateIterationDto,
  ): Promise<IterationEntity> {
    await this.iterationRepository.update(id, updateIterationDto);
    return this.iterationRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.iterationRepository.delete(id);
  }
}
