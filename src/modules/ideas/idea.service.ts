// idea.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

import { MetaI } from 'src/infrastructure/interfaces/meta.interface';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { FindAllIdeasQueryDto } from './dto/find-all-idea-query.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async create(
    createIdeaDto: CreateIdeaDto,
    req: IRequest,
  ): Promise<IdeaEntity> {
    const idea = this.ideaRepository.create({
      ...createIdeaDto,
      creatorId: req.user.id,
    });
    const saved = await this.ideaRepository.save(idea);
    return this.ideaRepository.findOne({
      where: { id: saved.id },
      relations: ['creator'],
    });
  }

  async findAll(
    query: FindAllIdeasQueryDto,
  ): Promise<{ data: IdeaEntity[]; meta: MetaI }> {
    const {
      page = 1,
      limit = 10,
      creatorId,
      description,
      isApproved,
      sort,
    } = query;

    const whereCondition = {};
    if (creatorId !== undefined) whereCondition['creatorId'] = creatorId;
    if (description) whereCondition['description'] = description;
    if (isApproved) whereCondition['isApproved'] = isApproved;

    // Sorting
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    } else {
      order['createdAt'] = 'DESC';
      order['likes'] = 'DESC';
    }

    const [results, total] = await this.ideaRepository.findAndCount({
      where: whereCondition,
      relations: ['creator'],
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<IdeaEntity> {
    return this.ideaRepository.findOneBy({ id });
  }

  async update(id: number, updateIdeaDto: UpdateIdeaDto): Promise<IdeaEntity> {
    await this.ideaRepository.update(id, updateIdeaDto);
    return this.ideaRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.ideaRepository.delete(id);
  }
}
