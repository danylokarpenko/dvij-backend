// find-all-talents-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class FindAllTalentsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'name:ASC'
}
