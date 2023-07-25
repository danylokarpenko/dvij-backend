import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  restrictionLvl: number;
  @ApiProperty()
  defaultLocation: string;
  @ApiProperty()
  currentLocation: string;
  @ApiProperty()
  refId: number;
  @ApiProperty()
  registered: boolean;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  lat: number;
  @ApiProperty()
  lng: number;
}
