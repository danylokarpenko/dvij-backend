// update-user-pay-rate.dto.ts

import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateGameUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isLead?: boolean;

  @ApiProperty()
  @IsNumber()
  bonus: number;
}
