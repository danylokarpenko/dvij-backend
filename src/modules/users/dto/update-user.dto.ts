import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from 'src/infrastructure/enums/UserRoleEnum.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDayDate?: Date;

  @IsOptional()
  @IsString()
  contacts?: string;

  @IsOptional()
  @IsDecimal()
  payRate?: number;

  @IsOptional()
  @IsDecimal()
  nextPayRateIncrease?: number;

  // Usually, we don't include ID in the DTO for updating, as it's typically passed in the URL or some other way.
  // Similarly, createdAt is not included because it should not change after creation.
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
