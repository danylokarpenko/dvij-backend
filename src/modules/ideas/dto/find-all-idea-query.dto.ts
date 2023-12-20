// find-all-ideas-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindAllIdeasQueryDto {
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
  @IsString()
  sort?: string; // For sorting, e.g., 'createdAt:DESC'
}
