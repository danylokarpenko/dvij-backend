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

import { KingdomsService } from './kingdoms.service';
import { CreateKingdomDto } from './dto/create-kingdom.dto';
import { UpdateKingdomDto } from './dto/update-kingdom.dto';

@ApiTags('kingdoms')
@Controller('kingdoms')
export class KingdomsController {
  constructor(private readonly kingdomsService: KingdomsService) {}

  @ApiOperation({ summary: 'Create kingdom' })
  @ApiResponse({ status: 200, description: 'Returns kingdom.' })
  @Post()
  create(@Body() createKingdomDto: CreateKingdomDto) {
    return this.kingdomsService.create(createKingdomDto);
  }

  @ApiOperation({ summary: 'Get all kingdoms' })
  @ApiResponse({ status: 200, description: 'Returns all kingdoms.' })
  @Get()
  findAll() {
    return this.kingdomsService.findAll();
  }

  @ApiOperation({ summary: 'Get kingdom by id' })
  @ApiResponse({ status: 200, description: 'Returns kingdom by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kingdomsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update kingdom by id' })
  @ApiResponse({ status: 200, description: 'Returns kingdom by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKingdomDto: UpdateKingdomDto) {
    return this.kingdomsService.update(+id, updateKingdomDto);
  }

  @ApiOperation({ summary: 'Delete kingdom by id' })
  @ApiResponse({ status: 200, description: 'Deletes kingdom by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kingdomsService.remove(+id);
  }
}
