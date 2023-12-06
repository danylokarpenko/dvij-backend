// create-hit-income.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateHitIncomeDto {
  @ApiProperty()
  @IsNumber()
  hitId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  month: Date;
}
