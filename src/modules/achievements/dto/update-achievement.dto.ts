// update-achievement.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateAchievementDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
