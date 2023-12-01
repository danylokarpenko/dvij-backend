// create-hit-income.dto.ts

import { IsDecimal, IsDate } from 'class-validator';

export class CreateHitIncomeDto {
  @IsDecimal()
  amount: number;

  @IsDate()
  month: Date;
}
