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

import { HitsService } from './hits.service';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';

@ApiTags('hits')
@Controller('hits')
export class HitsController {
  constructor(private readonly hitsService: HitsService) {}

  @ApiOperation({ summary: 'Create hit' })
  @ApiResponse({ status: 200, description: 'Returns hit.' })
  @Post()
  create(@Body() createHitDto: CreateHitDto) {
    return this.hitsService.create(createHitDto);
  }

  @ApiOperation({ summary: 'Get all hits' })
  @ApiResponse({ status: 200, description: 'Returns all hits.' })
  @Get()
  findAll() {
    return this.hitsService.findAll();
  }

  @ApiOperation({ summary: 'Get hit by id' })
  @ApiResponse({ status: 200, description: 'Returns hit by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hitsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update hit by id' })
  @ApiResponse({ status: 200, description: 'Returns hit by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHitDto: UpdateHitDto) {
    return this.hitsService.update(+id, updateHitDto);
  }

  @ApiOperation({ summary: 'Delete hit by id' })
  @ApiResponse({ status: 200, description: 'Deletes hit by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hitsService.remove(+id);
  }
}
