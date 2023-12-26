// create-user-pay-rate.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateGameUserDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  gameId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  bonus: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isLead?: boolean;
}
