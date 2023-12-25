import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTrelloDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  index?: number;

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
  likes?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @ApiProperty()
  gameId: number;
}
