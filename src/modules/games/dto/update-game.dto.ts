// update-game.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsBooleanString,
} from 'class-validator';

export class UpdateGameDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mainIdea?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  publisherUrl?: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  lastPatchDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  cpi?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  pt?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  d1?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  d7?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  targetCpi?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  targetPt?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  targetRetD1?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  targetRetD7?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  dau?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  installs?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  malesGenderPercentage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  minAge?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxAge?: number;

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => value === 'true')
  isHit?: boolean;
}
