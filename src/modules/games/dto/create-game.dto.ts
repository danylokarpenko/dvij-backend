// create-game.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iconUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mainIdea: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  publisherUrl: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  releaseDate: Date;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  @IsOptional()
  lastPatchDate?: Date;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  cpi: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  pt: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  d1: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  d7: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  targetCpi: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  targetPt: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  targetRetD1: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  targetRetD7: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  dau: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  installs: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  malesGenderPercentage: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  minAge: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
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
