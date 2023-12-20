import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateIdeaDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  creatorId: number;

  @ApiProperty()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @ApiProperty()
  gameId: number;

  @ApiProperty()
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  likes: number[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isApproved: boolean;
}
