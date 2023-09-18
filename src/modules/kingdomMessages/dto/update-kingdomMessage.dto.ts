import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateKingdomMessageDto } from './create-kingdomMessage.dto';
import { MaxLength } from 'class-validator';

export class UpdateKingdomMessageDto extends PartialType(
  CreateKingdomMessageDto,
) {
  @ApiProperty()
  @MaxLength(100)
  text: string;
}
