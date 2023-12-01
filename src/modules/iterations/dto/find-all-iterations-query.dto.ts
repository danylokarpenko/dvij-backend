// find-all-iterations-query.dto.ts

import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindAllIterationsQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  creatorId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  isApproved?: string;

  @IsOptional()
  @IsNumber()
  hitId?: number; // Assuming there is a relation with Hit

  @IsOptional()
  @IsNumber()
  gameId?: number; // Assuming there is a relation with Game

  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'createdAt:DESC'
}
