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
  UseGuards,
  Request,
} from '@nestjs/common';
import { IterationService } from './iteration.service';
import { CreateIterationDto } from './dto/create-iteration.dto';
import {
  UpdateIterationDto,
  UpdateIterationsDto,
} from './dto/update-iteration.dto';
import { FindAllIterationsQueryDto } from './dto/find-all-iterations-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('iterations')
export class IterationController {
  constructor(private readonly iterationService: IterationService) {}

  @Post()
  create(
    @Body() createIterationDto: CreateIterationDto,
    @Request() req: IRequest,
  ) {
    return this.iterationService.create(createIterationDto, req);
  }

  @Get()
  findAll(@Query() query: FindAllIterationsQueryDto) {
    return this.iterationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iterationService.findOne(+id);
  }

  @Put('bulk-update')
  bulkUpdate(@Body() updateIterationsDto: UpdateIterationsDto) {
    return this.iterationService.bulkUpdate(updateIterationsDto);
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
