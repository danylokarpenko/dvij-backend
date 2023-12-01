// find-all-users-query.dto.ts

import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class FindAllUsersQuery {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsDate()
  birthDayDate?: Date;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  sort?: string;
}
