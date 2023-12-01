// find-all-user-pay-rates-query.dto.ts

import { IsOptional, IsNumber, IsDate, IsString } from 'class-validator';

export class FindAllUserPayRatesQueryDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsDate()
  month?: Date;

  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'payRate:ASC'

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
