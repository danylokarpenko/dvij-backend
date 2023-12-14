// game-income.controller.ts

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
} from '@nestjs/common';
import { FindAllGameStatisticsQueryDto } from './dto/find-gameStatistic-query.dto';
import { GameStatisticService } from './gameStatistic.service';
import { CreateGameStatisticDto } from './dto/create-gameStatistic.dto';
import { UpdateGameStatisticDto } from './dto/update-gameStatistic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('game-incomes')
export class GameStatisticController {
  constructor(private readonly gameStatisticService: GameStatisticService) {}

  @Post()
  create(@Body() createGameStatisticDto: CreateGameStatisticDto) {
    return this.gameStatisticService.create(createGameStatisticDto);
  }

  @Get()
  findAll(@Query() query: FindAllGameStatisticsQueryDto) {
    return this.gameStatisticService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameStatisticService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameStatisticDto: UpdateGameStatisticDto,
  ) {
    return this.gameStatisticService.update(+id, updateGameStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameStatisticService.remove(+id);
  }
}
