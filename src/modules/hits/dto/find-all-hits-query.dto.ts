// find-all-hits-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class FindAllHitsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

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
  @IsNumber()
  installs?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  dau?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  malesGenderPercentage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minAge?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxAge?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string;
}
