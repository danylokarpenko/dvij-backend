// user-pay-rate.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameUsersController } from './gameUsers.controller';
import { GameUsersService } from './gameUsers.service';
import { GameUsersEntity } from './gameUsers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameUsersEntity])],
  controllers: [GameUsersController],
  providers: [GameUsersService],
})
export class GameUserModule {}
