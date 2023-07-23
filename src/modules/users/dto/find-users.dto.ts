import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FindUsersDto extends PartialType(
  OmitType(CreateUserDto, ['passwordHash'] as const),
) {}
