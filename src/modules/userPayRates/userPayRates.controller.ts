import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { HitIncomesService } from './userPayRates.service';
import { CreateHitIncomeDto } from '../hitIncomes/dto/create-hitIncome.dto';
import { UpdateHitIncomeDto } from '../hitIncomes/dto/update-hitIncome.dto';

@ApiTags('hitIncomes')
@Controller('hitIncomes')
export class HitIncomesController {
  constructor(private readonly hitIncomesService: HitIncomesService) {}

  @ApiOperation({ summary: 'Create hitIncome' })
  @ApiResponse({ status: 200, description: 'Returns hitIncome.' })
  @Post()
  create(@Body() createHitIncomeDto: CreateHitIncomeDto) {
    return this.hitIncomesService.create(createHitIncomeDto);
  }

  @ApiOperation({ summary: 'Get all hitIncomes' })
  @ApiResponse({ status: 200, description: 'Returns all hitIncomes.' })
  @Get()
  findAll() {
    return this.hitIncomesService.findAll();
  }

  @ApiOperation({ summary: 'Get hitIncome by id' })
  @ApiResponse({ status: 200, description: 'Returns hitIncome by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hitIncomesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update hitIncome by id' })
  @ApiResponse({ status: 200, description: 'Returns hitIncome by id.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHitIncomeDto: UpdateHitIncomeDto,
  ) {
    return this.hitIncomesService.update(+id, updateHitIncomeDto);
  }

  @ApiOperation({ summary: 'Delete hitIncome by id' })
  @ApiResponse({ status: 200, description: 'Deletes hitIncome by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hitIncomesService.remove(+id);
  }
}
