import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TraitsService } from './traits.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { FindTraitsDto } from './dto/find-traits.dto';

@ApiTags('traits')
@Controller('traits')
export class TraitsController {
  constructor(private readonly traitsService: TraitsService) {}

  @ApiOperation({ summary: 'Create trait' })
  @ApiResponse({ status: 200, description: 'Returns trait.' })
  @Post()
  create(@Body() createTraitDto: CreateTraitDto) {
    return this.traitsService.create(createTraitDto);
  }

  @ApiOperation({ summary: 'Get all traits' })
  @ApiResponse({ status: 200, description: 'Returns all traits.' })
  @Get()
  findAll(@Query() query: FindTraitsDto) {
    return this.traitsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get trait by id' })
  @ApiResponse({ status: 200, description: 'Returns trait by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traitsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update trait by id' })
  @ApiResponse({ status: 200, description: 'Returns trait by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTraitDto: UpdateTraitDto) {
    return this.traitsService.update(+id, updateTraitDto);
  }

  @ApiOperation({ summary: 'Delete trait by id' })
  @ApiResponse({ status: 200, description: 'Deletes trait by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traitsService.remove(+id);
  }
}
