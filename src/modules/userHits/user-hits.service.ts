import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHitsEntity } from './userHits.entity';
import { FindAllUserHitsQueryDto } from './dto/find-all-user-hits-query.dto';
import { CreateUserHitsDto } from './dto/create-userHit.dto';
import { UpdateUserHitsDto } from './dto/update-userHit.dto';

@Injectable()
export class UserHitsService {
  constructor(
    @InjectRepository(UserHitsEntity)
    private userHitsRepository: Repository<UserHitsEntity>,
  ) {}

  async create(data: CreateUserHitsDto): Promise<UserHitsEntity> {
    const userHit = this.userHitsRepository.create(data);
    return this.userHitsRepository.save(userHit);
  }

  async findAll(
    query: FindAllUserHitsQueryDto,
  ): Promise<{ data: UserHitsEntity[]; meta: any }> {
    const { userId, hitId, sort = 'createdAt:DESC', page, limit } = query;
    const whereCondition = {};

    if (userId) whereCondition['user'] = { id: userId };
    if (hitId) whereCondition['hit'] = { id: hitId };

    // Sorting logic
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    }

    const [results, total] = await this.userHitsRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<UserHitsEntity> {
    return this.userHitsRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateUserHitsDto): Promise<UserHitsEntity> {
    await this.userHitsRepository.update(id, data);
    return this.userHitsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userHitsRepository.delete(id);
  }
}
