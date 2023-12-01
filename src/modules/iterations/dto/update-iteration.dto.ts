import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateIterationDto {
  @IsOptional()
  @IsInt()
  creatorId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  likes?: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;
}
