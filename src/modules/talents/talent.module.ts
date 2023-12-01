import { Module } from '@nestjs/common';

import { TalentController } from './talent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentEntity } from './talent.entity';
import { TalentService } from './talent.service';

@Module({
  imports: [TypeOrmModule.forFeature([TalentEntity])],
  controllers: [TalentController],
  providers: [TalentService],
})
export class TalentsModule {}
