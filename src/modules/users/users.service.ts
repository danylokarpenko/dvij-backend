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
import { FindUsersDto } from './dto/find-users.dto';
import { queryToFindOperators } from 'src/infrastructure/utils/queryToFindOperators.util';
import { RegisterUserDto } from './dto/register-user.dto';

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

  register(createUserDto: RegisterUserDto) {
    return this.usersRepository.create(createUserDto).save();
  }

  async uploadAvatar(req: IRequest, avatar) {
    const user = await this.usersRepository.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw 'User not found';
    }
    const formData = new FormData();
    formData.append('image', avatar.buffer.toString('base64'));
    // const { data: imageData } = await firstValueFrom(
    //   this.httpService
    //     .post(
    //       `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
    //       formData,
    //     )
    //     .pipe(
    //       catchError((error: AxiosError) => {
    //         throw error;
    //       }),
    //     ),
    // );
    // user.updateOne({ avatar: imageData.data.url }).exec();
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

  findAll(query: FindUsersDto) {
    return this.usersRepository.find({ where: queryToFindOperators(query) });
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
