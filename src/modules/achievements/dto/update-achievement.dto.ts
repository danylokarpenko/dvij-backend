// update-achievement.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAchievementDto {
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
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
