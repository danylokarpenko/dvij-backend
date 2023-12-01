// update-game.dto.ts

import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsOptional()
  @IsString()
  publisherUrl?: string;

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsOptional()
  @IsDate()
  lastPatchDate?: Date;

  @IsOptional()
  @IsInt()
  cpi?: number;

  @IsOptional()
  @IsInt()
  pt?: number;

  @IsOptional()
  @IsInt()
  retD1?: number;

  @IsOptional()
  @IsInt()
  retD7?: number;

  @IsOptional()
  @IsInt()
  targetCpi?: number;

  @IsOptional()
  @IsInt()
  targetPt?: number;

  @IsOptional()
  @IsInt()
  targetRetD1?: number;

  @IsOptional()
  @IsInt()
  targetRetD7?: number;

  @IsOptional()
  @IsInt()
  dau?: number;

  @IsOptional()
  @IsInt()
  installs?: number;

  @IsOptional()
  @IsInt()
  malesGenderPercentage?: number;

  @IsOptional()
  @IsInt()
  minAge?: number;

  @IsOptional()
  @IsInt()
  maxAge?: number;
}
