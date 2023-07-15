import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementEntity } from './achievement.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from '../users/users.service';
import { AchievementKey } from 'src/infrastructure/enums/AchievementKey.enum';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(AchievementEntity)
    private achievementsRepository: Repository<AchievementEntity>,
    private usersService: UsersService,
  ) {}

  @OnEvent(AchievementKey.UserInvited)
  async handleOrderCreatedEvent({ userId }) {
    const achievement = await this.achievementsRepository.findOne({
      where: { key: AchievementKey.UserInvited },
    });
    const user = await UserEntity.findOne({
      where: { id: userId },
      relations: ['achievements'],
    });
    user.achievements.push(
      AchievementEntity.create({
        name: 'qwe',
        key: 'qwe',
      }),
    );
    return await UserEntity.update(userId, user);
  }

  create(createAchievementDto: CreateAchievementDto) {
    return this.achievementsRepository.create(createAchievementDto).save();
  }

  findAll() {
    return this.achievementsRepository.find();
  }

  findOne(id: number) {
    return this.achievementsRepository.findOneBy({ id });
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const achievement = await this.findOne(id);
    const mappedAchievement = Object.assign(achievement, updateAchievementDto);
    return this.achievementsRepository.update(id, mappedAchievement);
  }

  remove(id: number) {
    return this.achievementsRepository.delete(id);
  }
}
