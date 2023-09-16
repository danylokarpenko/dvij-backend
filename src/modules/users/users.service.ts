import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
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
import { AddTraitDto } from './dto/add-trait.dto';
import { UserTraitsEntity } from '../userTraits/userTraits.entity';
import { KingdomsService } from '../kingdoms/kingdoms.service';
import { TraitsService } from '../traits/traits.service';
import { UserKingdomsEntity } from '../userKingdoms/userKingdom.entity';
import { TraitEntity } from '../traits/trait.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserFriendsEntity)
    private userFriendsRepository: Repository<UserFriendsEntity>,
    private eventEmitter: EventEmitter2,
    private readonly kingdomsService: KingdomsService,
    private readonly traitsService: TraitsService,
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

  async uploadAvatar(req: IRequest, avatarFile) {
    const user = await this.usersRepository.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw 'User not found';
    }

    await this.usersRepository.update(user.id, {
      avatarUrl: avatarFile.filename,
    });
    return this.findOne(user.id);
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

  async _createKingdom(traitId, userId) {
    const trait = await this.traitsService.findOne(traitId);
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    const createdKingdom = await this.kingdomsService.create({
      traitId,
      name: trait.name,
      lat: Number(user.lat) + 10,
      lng: Number(user.lng) + 10,
    });
    const userTrait = await UserTraitsEntity.findOne({ where: { traitId } });
    await UserKingdomsEntity.create({
      userId: userTrait.userId,
      kingdomId: createdKingdom.id,
    }).save();
    return createdKingdom;
  }

  async addTraitToUser({ userId, traitName }: AddTraitDto) {
    const traitByName = await this.traitsService.findOneByNameUnique(traitName);
    let traitId = traitByName?.id;
    if (!traitByName) {
      traitId = (await this.traitsService.create({ name: traitName })).id;
    }

    const duplicate = await UserTraitsEntity.findOne({
      where: {
        userId,
        traitId,
      },
    });
    if (duplicate) {
      throw new BadRequestException('Trait is already added to user');
    }

    const kingdomByTraitId = await this.kingdomsService.findOneBy({ traitId });
    const traitsCount = await UserTraitsEntity.count({
      where: { traitId },
    });

    let createdKingdomId;
    const shouldCreateKingdomDueToSecondTrait = traitsCount === 1;

    await UserTraitsEntity.create({
      userId,
      traitId,
    }).save();

    if (!kingdomByTraitId && shouldCreateKingdomDueToSecondTrait) {
      const createdKingdom = await this._createKingdom(traitId, userId);

      createdKingdomId = createdKingdom.id;
    }

    const shouldAddUserToKingdom =
      traitsCount !== 0 && (kingdomByTraitId || createdKingdomId);
    if (shouldAddUserToKingdom) {
      await UserKingdomsEntity.create({
        userId,
        kingdomId: kingdomByTraitId?.id || createdKingdomId,
      }).save();
    }

    return true;
  }

  async getUserTraits(userId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['traits'],
      select: ['id', 'traits'],
    });
    if (!user) {
      throw new BadRequestException(`No user with ID ${userId}`);
    }
    return user?.traits;
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
        'traits.id',
        'traits.name',
        'kingdoms.id',
        'user.id',
        'user.refId',
        'user.lat',
        'user.lng',
        'kingdom.id',
        'kingdom.name',
        'kingdom.lat',
        'kingdom.lng',
      ])
      .leftJoin('users.friends', 'friends')
      .leftJoin('users.traits', 'traits')
      .leftJoin('users.kingdoms', 'kingdoms')
      .leftJoin('kingdoms.kingdom', 'kingdom')
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
