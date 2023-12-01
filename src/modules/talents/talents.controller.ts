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

import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';

@ApiTags('talents')
@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @ApiOperation({ summary: 'Create talent' })
  @ApiResponse({ status: 200, description: 'Returns talent.' })
  @Post()
  create(@Body() createTalentDto: CreateTalentDto) {
    return this.talentsService.create(createTalentDto);
  }

  @ApiOperation({ summary: 'Get all talents' })
  @ApiResponse({ status: 200, description: 'Returns all talents.' })
  @Get()
  findAll() {
    return this.talentsService.findAll();
  }

  @ApiOperation({ summary: 'Get talent by id' })
  @ApiResponse({ status: 200, description: 'Returns talent by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update talent by id' })
  @ApiResponse({ status: 200, description: 'Returns talent by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return this.talentsService.update(+id, updateTalentDto);
  }

  @ApiOperation({ summary: 'Delete talent by id' })
  @ApiResponse({ status: 200, description: 'Deletes talent by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentsService.remove(+id);
  }
}
