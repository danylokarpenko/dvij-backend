import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetKingdomMessagesDto {
  @ApiPropertyOptional()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @IsNotEmpty()
  kingdomId: number;

  @ApiPropertyOptional()
  @IsOptional()
  take?: number;

  @ApiPropertyOptional()
  @IsOptional()
  skip?: number;
}
