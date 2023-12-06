// create-user-hits.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt, IsNumber } from 'class-validator';

export class CreateUserHitsDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  hitId: number;

  @ApiProperty()
  @IsNumber()
  bonusPercentage: number;
}
