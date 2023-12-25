// find-all-trellos-query.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsNumber } from 'class-validator';

export class FindAllTrelloQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  gameId?: number;
}
