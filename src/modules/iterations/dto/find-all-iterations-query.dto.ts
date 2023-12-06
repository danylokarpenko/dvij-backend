// find-all-iterations-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindAllIterationsQueryDto {
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
  @IsNumber()
  creatorId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  isApproved?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hitId?: number; // Assuming there is a relation with Hit

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  gameId?: number; // Assuming there is a relation with Game

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'createdAt:DESC'
}
