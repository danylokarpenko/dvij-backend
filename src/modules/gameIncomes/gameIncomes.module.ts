import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameIncomeEntity } from './gameIncomes.entity';
import { GameIncomeController } from './gameIncomes.controller';
import { GameIncomeService } from './gameIncomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameIncomeEntity])],
  controllers: [GameIncomeController],
  providers: [GameIncomeService],
})
export class GameIncomesModule {}
