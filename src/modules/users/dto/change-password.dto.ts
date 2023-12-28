import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class ChangePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  newPasswordConfirmation: string;
}
