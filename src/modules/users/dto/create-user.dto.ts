import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsDecimal,
} from 'class-validator';

import { Type } from 'class-transformer';
import { UserRoleEnum } from 'src/infrastructure/enums/UserRoleEnum.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) // This decorator is used to transform the string input to a Date instance
  birthDayDate?: Date;

  @IsOptional()
  @IsString()
  contacts?: string;

  @IsDecimal()
  payRate: number;

  @IsOptional()
  @IsDecimal()
  nextPayRateIncrease?: number;

  // If you are going to include createdAt and updatedAt in DTO,
  // they should be optional as they are usually managed by the database.
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
