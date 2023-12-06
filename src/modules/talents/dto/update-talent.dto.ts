import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTalentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
