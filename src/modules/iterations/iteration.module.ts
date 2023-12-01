// iteration.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IterationController } from './iteration.controller';
import { IterationService } from './iteration.service';
import { IterationEntity } from './iteration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IterationEntity])],
  controllers: [IterationController],
  providers: [IterationService],
})
export class IterationModule {}
