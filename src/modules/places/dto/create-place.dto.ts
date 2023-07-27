import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
