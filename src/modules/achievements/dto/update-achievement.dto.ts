import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAchievementDto } from './create-achievement.dto';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  key: string;
}
