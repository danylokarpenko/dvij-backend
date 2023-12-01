// find-all-traits-query.dto.ts

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FindAllTraitsQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'name:ASC'

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
