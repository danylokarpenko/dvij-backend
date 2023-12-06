import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
