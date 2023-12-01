import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateIterationDto {
  @IsInt()
  creatorId: number;

  @IsString()
  description: string;

  @IsInt()
  likes: number;

  @IsBoolean()
  isApproved: boolean;
}
