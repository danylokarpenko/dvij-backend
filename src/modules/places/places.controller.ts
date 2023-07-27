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

import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { GetPlaceQueryDto } from './dto/get-place-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create place' })
  @ApiResponse({ status: 200, description: 'Returns place.' })
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto, @Request() req: IRequest) {
    return this.placesService.create(createPlaceDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all places' })
  @ApiResponse({
    status: 200,
    description: 'Returns by default places of current user',
  })
  @Get()
  findAll(@Request() req: IRequest, @Query() query: GetPlaceQueryDto) {
    return this.placesService.findAll(query, req);
  }

  @ApiOperation({ summary: 'Get place by id' })
  @ApiResponse({ status: 200, description: 'Returns place by id.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update place by id' })
  @ApiResponse({ status: 200, description: 'Returns place by id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @ApiOperation({ summary: 'Delete place by id' })
  @ApiResponse({ status: 200, description: 'Deletes place by id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
