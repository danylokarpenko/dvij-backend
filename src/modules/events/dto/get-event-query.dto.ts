import { ApiProperty } from '@nestjs/swagger';

export class GetEventQueryDto {
  @ApiProperty()
  creatorId: number;
}
