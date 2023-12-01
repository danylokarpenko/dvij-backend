import { IsString, IsOptional } from 'class-validator';

export class CreateTalentDto {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
