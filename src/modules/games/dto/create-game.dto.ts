// create-game.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  mainIdea: string;

  @ApiProperty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  iconUrl: string;

  @ApiProperty()
  @IsString()
  publisherUrl: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  releaseDate: Date;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  lastPatchDate?: Date;

  @ApiProperty()
  @IsInt()
  cpi: number;

  @ApiProperty()
  @IsInt()
  pt: number;

  @ApiProperty()
  @IsInt()
  d1: number;

  @ApiProperty()
  @IsInt()
  d7: number;

  @ApiProperty()
  @IsInt()
  targetCpi: number;

  @ApiProperty()
  @IsInt()
  targetPt: number;

  @ApiProperty()
  @IsInt()
  targetRetD1: number;

  @ApiProperty()
  @IsInt()
  targetRetD7: number;

  @ApiProperty()
  @IsInt()
  dau: number;

  @ApiProperty()
  @IsInt()
  installs: number;

  @ApiProperty()
  @IsInt()
  malesGenderPercentage: number;

  @ApiProperty()
  @IsInt()
  minAge: number;

  @ApiProperty()
  @IsInt()
  maxAge: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  iStoreLink: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  googleStoreLink: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gitLink: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  googleDriveLink: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  trelloLink: string;
}
