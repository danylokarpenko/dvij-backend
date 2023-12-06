// update-user-hits.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserHitsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  hitId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  bonusPercentage?: number;
}
