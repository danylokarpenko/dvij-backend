// create-game-income.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNumber, IsInt } from 'class-validator';

export class CreateGameStatisticDto {
  @ApiProperty()
  @IsNumber()
  gameId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsInt()
  cpi: number;

  @ApiProperty()
  @IsInt()
  pt: number;

  @ApiProperty()
  @IsInt()
  d1: number;

  @ApiProperty()
  @IsInt()
  d7: number;
}
