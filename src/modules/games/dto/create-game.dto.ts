// create-game.dto.ts

import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateGameDto {
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
  targetCpi: number;

  @IsInt()
  targetPt: number;

  @IsInt()
  targetRetD1: number;

  @IsInt()
  targetRetD7: number;

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
