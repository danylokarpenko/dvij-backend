// find-all-user-hits-query.dto.ts

import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindAllUserHitsQueryDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  hitId?: number;

  @IsOptional()
  @IsString()
  sort?: string; // e.g., 'createdAt:ASC'

  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
