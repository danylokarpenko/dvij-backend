// idea.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { FindAllIdeasQueryDto } from './dto/find-all-idea-query.dto';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  create(@Body() createIdeaDto: CreateIdeaDto, @Request() req: IRequest) {
    return this.ideaService.create(createIdeaDto, req);
  }

  @Get()
  findAll(@Query() query: FindAllIdeasQueryDto) {
    return this.ideaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideaService.update(+id, updateIdeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ideaService.remove(+id);
  }
}
