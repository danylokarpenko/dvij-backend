import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsInt } from 'class-validator';

export class UpdateGameStatisticDto {
  @ApiProperty()
  @IsInt()
  cpi: number;

  @ApiProperty()
  @IsInt()
  pt: number;

  @ApiProperty()
  @IsInt()
  d1: number;

  @ApiProperty()
  @IsInt()
  d7: number;
}
