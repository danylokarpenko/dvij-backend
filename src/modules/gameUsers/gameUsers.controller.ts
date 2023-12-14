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
import { FindAllGameUsersQueryDto } from './dto/find-all-gameUser-query.dto';
import { GameUsersService } from './gameUsers.service';
import { CreateGameUserDto } from './dto/create-gameUser.dto';
import { UpdateGameUserDto } from './dto/update-gameUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('gameUsers')
export class GameUsersController {
  constructor(private readonly gameUsersService: GameUsersService) {}

  @Post()
  create(@Body() createGameUserDto: CreateGameUserDto) {
    return this.gameUsersService.create(createGameUserDto);
  }

  @Get()
  findAll(@Query() query: FindAllGameUsersQueryDto) {
    return this.gameUsersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameUsersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameUserDto: UpdateGameUserDto,
  ) {
    return this.gameUsersService.update(+id, updateGameUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameUsersService.remove(+id);
  }
}
