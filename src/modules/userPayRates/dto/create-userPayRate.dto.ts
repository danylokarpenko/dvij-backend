// create-user-pay-rate.dto.ts

import { IsDecimal, IsDate } from 'class-validator';

export class CreateUserPayRateDto {
  @IsDecimal()
  payRate: number;

  @IsDecimal()
  hoursWorked: number;

  @IsDate()
  month: Date;
}
