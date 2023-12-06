import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHitsController } from './user-hits.controller';
import { UserHitsService } from './user-hits.service';
import { UserHitsEntity } from './userHits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHitsEntity])],
  controllers: [UserHitsController],
  providers: [UserHitsService],
})
export class UserHitsModule {}
