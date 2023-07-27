import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
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
}
