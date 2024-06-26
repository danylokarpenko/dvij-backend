import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class UpdateIterationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
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

export class UpdateIterationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIterationDto)
  payload: UpdateIterationDto[];
}
