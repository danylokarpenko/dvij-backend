import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { AddFriendDto } from './dto/add-friend.dto';
import { AchievementKey } from 'src/infrastructure/enums/AchievementKey.enum';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFriendInfoDto } from './dto/update-friend-info.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserFriendsEntity)
    private userFriendsRepository: Repository<UserFriendsEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  findByUsernameWithPassword(username: string): Promise<UserEntity> {
    const entity = this.usersRepository.findOne({
      where: { username },
      select: ['id', 'firstName', 'lastName', 'username', 'passwordHash'],
    });
    return entity;
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto).save();
  }

  async addToFriend({ userId, addedUserId }: AddFriendDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    const friend = await this.usersRepository.findOne({
      where: { id: addedUserId },
    });

    await UserFriendsEntity.create({
      userId: userId,
      friendId: addedUserId,
    }).save();
    await UserFriendsEntity.create({
      userId: addedUserId,
      friendId: userId,
    }).save();

    if (!friend.registered) {
      friend.registered = true;
      await this.usersRepository.save(friend);
      await this.eventEmitter.emit(AchievementKey.UserInvited, {
        userId,
      });
    }

    await this.usersRepository.save(user);

    return true;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async getStartScreenInfo(req) {
    const {
      user: { id },
    } = req;

    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where({ id })
      .select([
        'users',
        'friends.id',
        'friends.respect',
        'user.id',
        'user.refId',
        'user.lat',
        'user.lng',
      ])
      .leftJoin('users.friends', 'friends')
      .leftJoin('friends.user', 'user')
      .getOne();

    const respect = await this.userFriendsRepository
      .createQueryBuilder('userFriends')
      .where({ friendId: id })
      .select('SUM(userFriends.respect)', 'totalRespectCount')
      .addSelect('count(userFriends.id)', 'totalFriendsCount')
      .getRawOne();

    return {
      ...user,
      totalRespectCount: parseInt(respect.totalRespectCount),
      totalFriendsCount: parseInt(respect.totalFriendsCount),
      totalEventsCount: parseInt(respect.totalFriendsCount),
    };
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(query) {
    return this.usersRepository.findOneBy(query);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const mappedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.update(id, mappedUser);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async updateFriend(
    friendId: number,
    payload: UpdateFriendInfoDto,
    req: IRequest,
  ) {
    const userFriend = await this.userFriendsRepository.findOne({
      where: { userId: req.user.id, friendId },
    });
    return this.userFriendsRepository.save(Object.assign(userFriend, payload));
  }
}
