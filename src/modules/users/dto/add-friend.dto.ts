import { ApiProperty } from '@nestjs/swagger';

export class AddFriendDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  addedUserId: number;
}
