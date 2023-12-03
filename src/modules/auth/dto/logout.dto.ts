import { IsNotEmpty, IsNumber } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
