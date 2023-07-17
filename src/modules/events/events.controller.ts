import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { GetEventQueryDto } from './dto/get-event-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({ status: 200, description: 'Returns event.' })
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Request() req: IRequest) {
    return this.eventsService.create(createEventDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Returns by default events of current user',
  })
  @Get()
  findAll(@Request() req: IRequest, @Query() query: GetEventQueryDto) {
    return this.eventsService.findAll(query, req);
  }

  @ApiOperation({ summary: 'Get event by id' })
  @ApiResponse({ status: 200, description: 'Returns event by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update event by id' })
  @ApiResponse({ status: 200, description: 'Returns event by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete event by id' })
  @ApiResponse({ status: 200, description: 'Deletes event by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
