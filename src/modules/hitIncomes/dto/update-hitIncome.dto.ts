// update-hit-income.dto.ts

import { IsDecimal, IsDate, IsOptional } from 'class-validator';

export class UpdateHitIncomeDto {
  @IsOptional()
  @IsDecimal()
  amount?: number;

  @IsOptional()
  @IsDate()
  month?: Date;
}
