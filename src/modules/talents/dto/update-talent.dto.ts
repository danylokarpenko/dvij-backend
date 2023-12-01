import { IsString, IsOptional } from 'class-validator';

export class UpdateTalentDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
