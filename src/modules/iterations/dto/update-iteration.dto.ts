import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateIterationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  creatorId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  likes?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  hitId: number;

  @ApiProperty()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @ApiProperty()
  gameId: number;
}
