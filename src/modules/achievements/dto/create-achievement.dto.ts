import { ApiProperty } from '@nestjs/swagger';

export class CreateAchievementDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  key: string;
}
