// find-all-hits-query.dto.ts

import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class FindAllHitsQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsOptional()
  @IsDate()
  lastPatchDate?: Date;

  @IsOptional()
  @IsNumber()
  installs?: number;

  @IsOptional()
  @IsNumber()
  dau?: number;

  @IsOptional()
  @IsNumber()
  malesGenderPercentage?: number;

  @IsOptional()
  @IsNumber()
  minAge?: number;

  @IsOptional()
  @IsNumber()
  maxAge?: number;

  @IsOptional()
  @IsString()
  sort?: string;
}
