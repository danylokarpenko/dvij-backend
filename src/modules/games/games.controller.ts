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

import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: 200, description: 'Returns game.' })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'Returns all games.' })
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({ status: 200, description: 'Returns game by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update game by id' })
  @ApiResponse({ status: 200, description: 'Returns game by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @ApiOperation({ summary: 'Delete game by id' })
  @ApiResponse({ status: 200, description: 'Deletes game by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
