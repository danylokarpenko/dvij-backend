// find-all-user-hits-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindAllUserHitsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hitId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string; // e.g., 'createdAt:ASC'

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
