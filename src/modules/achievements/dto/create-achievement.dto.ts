// create-achievement.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsOptional } from 'class-validator';

export class CreateAchievementDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
