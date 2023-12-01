// update-user-hits.dto.ts

import { IsInt, IsDecimal, IsOptional } from 'class-validator';

export class UpdateUserHitsDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  hitId?: number;

  @IsOptional()
  @IsDecimal()
  bonusPercentage?: number;
}
