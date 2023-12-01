// trait.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TraitService } from './trait.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { FindAllTraitsQueryDto } from './dto/find-all-traits-query.dto';

@Controller('traits')
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @Post()
  create(@Body() createTraitDto: CreateTraitDto) {
    return this.traitService.create(createTraitDto);
  }

  @Get()
  findAll(@Query() query: FindAllTraitsQueryDto) {
    return this.traitService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traitService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTraitDto: UpdateTraitDto) {
    return this.traitService.update(+id, updateTraitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traitService.remove(+id);
  }
}
