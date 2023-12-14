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
import { FindAllGameIncomesQueryDto } from './dto/find-all-gameIncome-query.dto';
import { GameIncomeService } from './gameIncomes.service';
import { CreateGameIncomeDto } from './dto/create-gameIncome.dto';
import { UpdateGameIncomeDto } from './dto/update-gameIncome.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('game-incomes')
export class GameIncomeController {
  constructor(private readonly gameIncomeService: GameIncomeService) {}

  @Post()
  create(@Body() createGameIncomeDto: CreateGameIncomeDto) {
    return this.gameIncomeService.create(createGameIncomeDto);
  }

  @Get()
  findAll(@Query() query: FindAllGameIncomesQueryDto) {
    return this.gameIncomeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameIncomeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameIncomeDto: UpdateGameIncomeDto,
  ) {
    return this.gameIncomeService.update(+id, updateGameIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameIncomeService.remove(+id);
  }
}
