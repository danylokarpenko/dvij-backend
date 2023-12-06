import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { UserRoleEnum } from 'src/infrastructure/enums/UserRoleEnum.enum';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date) // This decorator is used to transform the string input to a Date instance
  birthDayDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contacts?: string;

  @ApiProperty()
  @IsNumber()
  payRate: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  nextPayRateIncrease?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // If you are going to include createdAt and updatedAt in DTO,
  // they should be optional as they are usually managed by the database.
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
