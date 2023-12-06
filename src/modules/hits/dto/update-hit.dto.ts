// update-hit.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateHitDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

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

  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false })
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
  retD1?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  retD7?: number;

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
}
