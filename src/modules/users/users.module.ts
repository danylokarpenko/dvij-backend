import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { TraitEntity } from '../traits/trait.entity';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';
import { KingdomsService } from '../kingdoms/kingdoms.service';
import { TraitsService } from '../traits/traits.service';
import { KingdomEntity } from '../kingdoms/kingdom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TraitEntity,
      UserFriendsEntity,
      KingdomEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, KingdomsService, TraitsService],
  exports: [UsersService, KingdomsService, TraitsService],
})
export class UsersModule {}
