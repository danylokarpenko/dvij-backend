import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitIncomeEntity } from './hitIncome.entity';
import { HitIncomesController } from '../userPayRates/userPayRate.controller';
import { HitIncomesService } from '../userPayRates/userPayRate.service';

@Module({
  imports: [TypeOrmModule.forFeature([HitIncomeEntity])],
  controllers: [HitIncomesController],
  providers: [HitIncomesService],
})
export class HitIncomesModule {}
