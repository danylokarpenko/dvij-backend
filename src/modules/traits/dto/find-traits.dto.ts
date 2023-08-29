import { ApiProperty } from '@nestjs/swagger';

export class FindTraitsDto {
  @ApiProperty({ required: false })
  name: string;
}
