import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateFriendInfoDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  givenName: string;

  @ApiProperty()
  respect: number;
}
