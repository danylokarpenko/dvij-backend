import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsDate, IsString } from 'class-validator';

export class FindAllGameUsersQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  month?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string; // For sorting, e.g., 'payRate:ASC'

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
