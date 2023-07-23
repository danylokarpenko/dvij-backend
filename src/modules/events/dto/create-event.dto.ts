import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isCompetition: boolean;

  @ApiProperty()
  winnerId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
