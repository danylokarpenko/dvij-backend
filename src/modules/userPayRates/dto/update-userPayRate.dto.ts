// update-user-pay-rate.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateUserPayRateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  payRate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  month?: Date;
}
