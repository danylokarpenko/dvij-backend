import { Module } from '@nestjs/common';
import { HitsService } from './hits.service';
import { HitsController } from './hits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitEntity } from './hits.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HitEntity]), UsersModule],
  controllers: [HitsController],
  providers: [HitsService],
})
export class HitsModule {}
