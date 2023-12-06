import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UserRoleEnum } from 'src/infrastructure/enums/UserRoleEnum.enum';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDayDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contacts?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  payRate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  nextPayRateIncrease?: number;

  // Usually, we don't include ID in the DTO for updating, as it's typically passed in the URL or some other way.
  // Similarly, createdAt is not included because it should not change after creation.
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
