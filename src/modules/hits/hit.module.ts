// hit.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitController } from './hit.controller';
import { HitService } from './hit.service';
import { HitEntity } from './hit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HitEntity])],
  controllers: [HitController],
  providers: [HitService],
})
export class HitModule {}
