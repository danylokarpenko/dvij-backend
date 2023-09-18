import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateKingdomMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsOptional()
  replyToMessageId: number;

  @ApiProperty()
  @IsNotEmpty()
  kingdomId: number;
}
