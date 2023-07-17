import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
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
