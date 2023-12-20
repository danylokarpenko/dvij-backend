// create-game-income.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateGameIncomeDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  month: Date;
}
