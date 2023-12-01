// iteration.controller.ts

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
import { IterationService } from './iteration.service';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';
import { FindAllIterationsQueryDto } from './dto/find-all-iterations-query.dto';

@Controller('iterations')
export class IterationController {
  constructor(private readonly iterationService: IterationService) {}

  @Post()
  create(@Body() createIterationDto: CreateIterationDto) {
    return this.iterationService.create(createIterationDto);
  }

  @Get()
  findAll(@Query() query: FindAllIterationsQueryDto) {
    return this.iterationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iterationService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIterationDto: UpdateIterationDto,
  ) {
    return this.iterationService.update(+id, updateIterationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iterationService.remove(+id);
  }
}
