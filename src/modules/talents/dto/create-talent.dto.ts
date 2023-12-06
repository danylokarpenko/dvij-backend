import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsOptional } from 'class-validator';

export class CreateTalentDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
