// create-user-pay-rate.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateUserPayRateDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  payRate: number;

  @ApiProperty()
  @IsNumber()
  hoursWorked: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  month: Date;
}
