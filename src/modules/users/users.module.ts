import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { TraitEntity } from '../traits/trait.entity';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TraitEntity, UserFriendsEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
