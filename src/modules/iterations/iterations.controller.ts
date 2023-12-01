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

import { IterationsService } from './iterations.service';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';

@ApiTags('iterations')
@Controller('iterations')
export class IterationsController {
  constructor(private readonly iterationsService: IterationsService) {}

  @ApiOperation({ summary: 'Create iteration' })
  @ApiResponse({ status: 200, description: 'Returns iteration.' })
  @Post()
  create(@Body() createIterationDto: CreateIterationDto) {
    return this.iterationsService.create(createIterationDto);
  }

  @ApiOperation({ summary: 'Get all iterations' })
  @ApiResponse({ status: 200, description: 'Returns all iterations.' })
  @Get()
  findAll() {
    return this.iterationsService.findAll();
  }

  @ApiOperation({ summary: 'Get iteration by id' })
  @ApiResponse({ status: 200, description: 'Returns iteration by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iterationsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update iteration by id' })
  @ApiResponse({ status: 200, description: 'Returns iteration by id.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIterationDto: UpdateIterationDto,
  ) {
    return this.iterationsService.update(+id, updateIterationDto);
  }

  @ApiOperation({ summary: 'Delete iteration by id' })
  @ApiResponse({ status: 200, description: 'Deletes iteration by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iterationsService.remove(+id);
  }
}
