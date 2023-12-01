// update-user-pay-rate.dto.ts

import { IsDecimal, IsDate, IsOptional } from 'class-validator';

export class UpdateUserPayRateDto {
  @IsOptional()
  @IsDecimal()
  payRate?: number;

  @IsOptional()
  @IsDecimal()
  hoursWorked?: number;

  @IsOptional()
  @IsDate()
  month?: Date;
}
