import { ApiProperty } from '@nestjs/swagger';

export class AddTraitDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  traitName: string;
}
