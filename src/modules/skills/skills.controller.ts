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

import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: 'Create skill' })
  @ApiResponse({ status: 200, description: 'Returns skill.' })
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Returns all skills.' })
  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @ApiOperation({ summary: 'Get skill by id' })
  @ApiResponse({ status: 200, description: 'Returns skill by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update skill by id' })
  @ApiResponse({ status: 200, description: 'Returns skill by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @ApiOperation({ summary: 'Delete skill by id' })
  @ApiResponse({ status: 200, description: 'Deletes skill by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}
