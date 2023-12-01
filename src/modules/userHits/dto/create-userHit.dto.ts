// create-user-hits.dto.ts

import { IsInt, IsDecimal } from 'class-validator';

export class CreateUserHitsDto {
  @IsInt()
  userId: number;

  @IsInt()
  hitId: number;

  @IsDecimal()
  bonusPercentage: number;
}
