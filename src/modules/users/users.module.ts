import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SkillEntity } from '../skills/skill.entity';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SkillEntity, UserFriendsEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
