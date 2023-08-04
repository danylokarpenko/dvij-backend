import { ApiProperty } from '@nestjs/swagger';

export class GetPlaceQueryDto {
  @ApiProperty({ required: false })
  creatorId: number;
}
