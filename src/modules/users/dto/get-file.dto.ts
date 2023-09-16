import { ApiProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiProperty()
  name: string;
}
