import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitIncomeEntity } from './hitIncome.entity';
import { HitIncomeController } from './hitIncome.controller';
import { HitIncomeService } from './hitIncome.service';

@Module({
  imports: [TypeOrmModule.forFeature([HitIncomeEntity])],
  controllers: [HitIncomeController],
  providers: [HitIncomeService],
})
export class HitIncomesModule {}
