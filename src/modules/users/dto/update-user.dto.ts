import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  restrictionLvl: number;

  @ApiProperty()
  registered: boolean;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
