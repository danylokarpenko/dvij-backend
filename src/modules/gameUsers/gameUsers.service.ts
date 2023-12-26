// user-pay-rates.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllGameUsersQueryDto } from './dto/find-all-gameUser-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';

import { UpdateGameUserDto } from './dto/update-gameUser.dto';
import { CreateGameUserDto } from './dto/create-gameUser.dto';
import { GameUsersEntity } from './gameUsers.entity';

@Injectable()
export class GameUsersService {
  constructor(
    @InjectRepository(GameUsersEntity)
    private gameUserRepository: Repository<GameUsersEntity>,
  ) {}

  async create(createGameUserDto: CreateGameUserDto): Promise<GameUsersEntity> {
    const isExist = await this.gameUserRepository.findOne({
      where: {
        userId: createGameUserDto.userId,
        gameId: createGameUserDto.gameId,
      },
    });
    if (isExist) throw new Error('Game User already exist');
    const gameUser = this.gameUserRepository.create(createGameUserDto);
    const createdGameUser = await this.gameUserRepository.save(gameUser);
    const res = await this.gameUserRepository.findOne({
      where: { id: createdGameUser.id },
      relations: ['user'],
    });
    return res;
  }

  async findAll(
    query: FindAllGameUsersQueryDto,
  ): Promise<{ data: GameUsersEntity[]; meta: MetaI }> {
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

    const [results, total] = await this.gameUserRepository.findAndCount({
      where: whereCondition,
      order: order,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data: results, meta: { total, page, limit, totalPages } };
  }
  async findOne(id: number): Promise<GameUsersEntity> {
    return this.gameUserRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateGameUserDto: UpdateGameUserDto,
  ): Promise<GameUsersEntity> {
    await this.gameUserRepository.update(id, updateGameUserDto);
    return this.gameUserRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gameUserRepository.delete(id);
  }
}
