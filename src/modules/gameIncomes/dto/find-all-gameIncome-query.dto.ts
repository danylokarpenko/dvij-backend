// find-all-game-incomes-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsDate, IsString } from 'class-validator';

export class FindAllGameIncomesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  month?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hitId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'amount:DESC'
}
