// user.service.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require('bcryptjs');
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQuery } from './dto/find-all-users-query.dto';
import { MetaI } from 'src/infrastructure/interfaces/meta.interface';

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
      sort = 'createdAt:DESC',
    } = query;

    const whereCondition = [];
    if (firstName) whereCondition.push({ firstName: Like(`%${firstName}%`) });
    if (lastName) whereCondition.push({ lastName: Like(`%${lastName}%`) });
    if (role) whereCondition.push({ role });
    if (jobTitle) whereCondition.push({ jobTitle: Like(`%${jobTitle}%`) });
    if (birthDayDate) whereCondition.push({ birthDayDate });
    if (email) whereCondition.push({ email: Like(`%${email}%`) });
    // Sorting
    const order = {};
    const [sortField, sortDirection] = (sort || 'createdAt:DESC').split(':');
    order[sortField] = sortDirection.toUpperCase();

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
    return this.userRepository.findOne({
      where: { id },
      relations: ['gameUsers', 'gameUsers.game'],
    });
  }

  async findOneBy(where): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: where });
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    const entity = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'role', 'email', 'firstName', 'lastName', 'passwordHash'],
    });
    return entity;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;
    const saltOrRounds = 10;
    const passwordHash = await bcryptjs.hash(password, saltOrRounds);
    const user = this.userRepository.create({ ...rest, passwordHash });
    const res = await this.userRepository.save(user);
    delete res.passwordHash;
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateUserRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      user.refreshToken = refreshToken;
      await this.userRepository.save(user);
    }
  }

  async invalidateRefreshToken(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      user.refreshToken = null;
      await this.userRepository.save(user);
    }
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const isOldPasswordValid = await bcryptjs.compare(
      oldPassword,
      user.passwordHash,
    );
    if (!isOldPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    const saltOrRounds = 10;
    const newPasswordHash = await bcryptjs.hash(newPassword, saltOrRounds);

    user.passwordHash = newPasswordHash;
    await this.userRepository.save(user);

    await this.invalidateRefreshToken(userId);
  }
}
