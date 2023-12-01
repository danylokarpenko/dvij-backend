// find-all-games-query.dto.ts

import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class FindAllGamesQueryDto {
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
  cpi?: number;

  @IsOptional()
  @IsNumber()
  pt?: number;

  @IsOptional()
  @IsNumber()
  retD1?: number;

  @IsOptional()
  @IsNumber()
  retD7?: number;

  @IsOptional()
  @IsNumber()
  dau?: number;

  @IsOptional()
  @IsNumber()
  installs?: number;

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
