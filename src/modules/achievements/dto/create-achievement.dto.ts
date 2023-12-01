// create-achievement.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
