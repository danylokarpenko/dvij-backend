// create-hit.dto.ts

import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateHitDto {
  @IsString()
  name: string;

  @IsString()
  videoUrl: string;

  @IsString()
  iconUrl: string;

  @IsString()
  publisherUrl: string;

  @IsDate()
  releaseDate: Date;

  @IsOptional()
  @IsDate()
  lastPatchDate?: Date;

  @IsInt()
  cpi: number;

  @IsInt()
  pt: number;

  @IsInt()
  retD1: number;

  @IsInt()
  retD7: number;

  @IsInt()
  dau: number;

  @IsInt()
  installs: number;

  @IsInt()
  malesGenderPercentage: number;

  @IsInt()
  minAge: number;

  @IsInt()
  maxAge: number;
}
