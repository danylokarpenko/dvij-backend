// trello.controller.ts

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TrelloService } from './trello.service';
import { FindAllTrelloQueryDto } from './dto/find-all-trello-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get()
  findAll(@Query() query: FindAllTrelloQueryDto) {
    return this.trelloService.getIsNewTasksInGame(query);
  }
}
