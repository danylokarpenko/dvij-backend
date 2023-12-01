// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQuery } from './dto/find-all-users-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/Meta.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(
    query: FindAllUsersQuery,
  ): Promise<{ data: UserEntity[]; meta: MetaI }> {
    const {
      page = 1,
      limit = 10,
      firstName,
      lastName,
      role,
      jobTitle,
      birthDayDate,
      email,
    } = query;

    const whereCondition = [];
    if (firstName) whereCondition.push({ firstName: Like(`%${firstName}%`) });
    if (lastName) whereCondition.push({ lastName: Like(`%${lastName}%`) });
    if (role) whereCondition.push({ role });
    if (jobTitle) whereCondition.push({ jobTitle: Like(`%${jobTitle}%`) });
    if (birthDayDate) whereCondition.push({ birthDayDate });
    if (email) whereCondition.push({ email: Like(`%${email}%`) });

    const [results, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    const meta = {
      total,
      page,
      limit,
      totalPages,
    };

    return { data: results, meta };
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
