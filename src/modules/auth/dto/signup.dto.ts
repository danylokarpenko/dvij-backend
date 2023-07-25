import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
