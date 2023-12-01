// hit.controller.ts

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
import { HitService } from './hit.service';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';
import { FindAllHitsQueryDto } from './dto/find-all-hits-query.dto';

@Controller('hits')
export class HitController {
  constructor(private readonly hitService: HitService) {}

  @Post()
  create(@Body() createHitDto: CreateHitDto) {
    return this.hitService.create(createHitDto);
  }

  @Get()
  findAll(@Query() query: FindAllHitsQueryDto) {
    return this.hitService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hitService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHitDto: UpdateHitDto) {
    return this.hitService.update(+id, updateHitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hitService.remove(+id);
  }
}
