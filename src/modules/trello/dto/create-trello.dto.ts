import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateTrelloDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  creatorId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  index: number;

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
