import { Module } from '@nestjs/common';
import { HitIncomesService } from './hitIncomes.service';
import { HitIncomesController } from './hitIncomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitIncomeEntity } from './hitIncomes.entity';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([HitIncomeEntity]), UsersModule],
  controllers: [HitIncomesController],
  providers: [HitIncomesService],
})
export class HitIncomesModule {}
