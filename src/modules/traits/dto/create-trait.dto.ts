import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTraitDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  iconUrl: string;
}
