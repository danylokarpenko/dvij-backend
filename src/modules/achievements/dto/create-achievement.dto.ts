// create-achievement.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
