import { ApiProperty } from '@nestjs/swagger';

export class CreateKingdomDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  traitId: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
