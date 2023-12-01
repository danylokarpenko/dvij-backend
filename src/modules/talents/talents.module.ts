import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentEntity } from './talents.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TalentEntity]), UsersModule],
  controllers: [TalentsController],
  providers: [TalentsService],
})
export class TalentsModule {}
