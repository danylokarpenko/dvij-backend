import { Module } from '@nestjs/common';
import { IterationsService } from './iterations.service';
import { IterationsController } from './iterations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IterationEntity } from './iterations.entity';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([IterationEntity]), UsersModule],
  controllers: [IterationsController],
  providers: [IterationsService],
})
export class IterationsModule {}
