import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AchievementEntity } from './achievement.entity';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(AchievementEntity)
    private achievementRepository: Repository<AchievementEntity>,
  ) {}

  async findAll(
    query: FindAllQueryDto,
  ): Promise<{ data: AchievementEntity[]; meta: MetaI }> {
    const { page = 1, limit = 10, key, name, description, sort } = query;
    // Search
    const whereCondition = [];
    if (key) whereCondition.push({ key: Like(`%${key}%`) });
    if (name) whereCondition.push({ name: Like(`%${name}%`) });
    if (description)
      whereCondition.push({ description: Like(`%${description}%`) });
    // Sorting
    const order = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      order[sortField] = sortDirection.toUpperCase();
    } else {
      order['createdAt'] = 'DESC';
    }

    const [results, total] = await this.achievementRepository.findAndCount({
      where: whereCondition,
      order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    const meta = { total, page, limit, totalPages };
    return { data: results, meta };
  }

  async create(
    createAchievementDto: CreateAchievementDto,
  ): Promise<AchievementEntity> {
    const achievement = this.achievementRepository.create(createAchievementDto);
    return this.achievementRepository.save(achievement);
  }

  async findOne(id: number): Promise<AchievementEntity> {
    return this.achievementRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<AchievementEntity> {
    await this.achievementRepository.update(id, updateAchievementDto);
    return this.achievementRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
