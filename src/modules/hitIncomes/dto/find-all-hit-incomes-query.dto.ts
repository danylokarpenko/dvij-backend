// find-all-hit-incomes-query.dto.ts

import { IsOptional, IsNumber, IsDate, IsString } from 'class-validator';

export class FindAllHitIncomesQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDate()
  month?: Date;

  @IsOptional()
  @IsNumber()
  hitId?: number;

  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'amount:DESC'
}
