import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @ApiOperation({ summary: 'Create achievement' })
  @ApiResponse({ status: 200, description: 'Returns achievement.' })
  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }

  @ApiOperation({ summary: 'Get all achievements' })
  @ApiResponse({ status: 200, description: 'Returns all achievements.' })
  @Get()
  findAll() {
    return this.achievementsService.findAll();
  }

  @ApiOperation({ summary: 'Get achievement by id' })
  @ApiResponse({ status: 200, description: 'Returns achievement by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update achievement by id' })
  @ApiResponse({ status: 200, description: 'Returns achievement by id.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ) {
    return this.achievementsService.update(+id, updateAchievementDto);
  }

  @ApiOperation({ summary: 'Delete achievement by id' })
  @ApiResponse({ status: 200, description: 'Deletes achievement by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(+id);
  }
}
