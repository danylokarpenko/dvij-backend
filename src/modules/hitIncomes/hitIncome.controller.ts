// hit-income.controller.ts

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
import { FindAllHitIncomesQueryDto } from './dto/find-all-hit-incomes-query.dto';
import { HitIncomeService } from './hitIncome.service';
import { CreateHitIncomeDto } from './dto/create-hitIncome.dto';
import { UpdateHitIncomeDto } from './dto/update-hitIncome.dto';

@Controller('hit-incomes')
export class HitIncomeController {
  constructor(private readonly hitIncomeService: HitIncomeService) {}

  @Post()
  create(@Body() createHitIncomeDto: CreateHitIncomeDto) {
    return this.hitIncomeService.create(createHitIncomeDto);
  }

  @Get()
  findAll(@Query() query: FindAllHitIncomesQueryDto) {
    return this.hitIncomeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hitIncomeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHitIncomeDto: UpdateHitIncomeDto,
  ) {
    return this.hitIncomeService.update(+id, updateHitIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hitIncomeService.remove(+id);
  }
}
