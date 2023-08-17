import { ApiProperty } from '@nestjs/swagger';

export class CreateTraitDto {
  @ApiProperty()
  name: string;
}
