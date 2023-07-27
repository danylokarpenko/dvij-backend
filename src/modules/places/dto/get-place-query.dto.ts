import { ApiProperty } from '@nestjs/swagger';

export class GetPlaceQueryDto {
  @ApiProperty()
  creatorId: number;
}
