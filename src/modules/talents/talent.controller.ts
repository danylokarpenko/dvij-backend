// talent.controller.ts

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
import { TalentService } from './talent.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { FindAllTalentsQueryDto } from './dto/find-all-talents-query.dto';

@Controller('talents')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post()
  create(@Body() createTalentDto: CreateTalentDto) {
    return this.talentService.create(createTalentDto);
  }

  @Get()
  findAll(@Query() query: FindAllTalentsQueryDto) {
    return this.talentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return this.talentService.update(+id, updateTalentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentService.remove(+id);
  }
}
