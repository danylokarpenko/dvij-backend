import { ApiProperty } from '@nestjs/swagger';

export class UpdateFriendInfoDto {
  @ApiProperty()
  givenName: string;

  @ApiProperty()
  respect: number;
}