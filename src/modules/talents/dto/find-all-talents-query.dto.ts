// find-all-talents-query.dto.ts

import { IsString, IsOptional, IsInt } from 'class-validator';

export class FindAllTalentsQueryDto {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'name:ASC'
}
