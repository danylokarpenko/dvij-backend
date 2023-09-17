import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateKingdomMessageDto } from './dto/create-kingdomMessage.dto';
import { UpdateKingdomMessageDto } from './dto/update-kingdomMessage.dto';
import { KingdomMessagesService } from './kingdomMessages.service';
import { GetKingdomMessagesDto } from './dto/get-kingdomMessages.dto';

@ApiTags('Kingdom Messages')
@Controller('kingdomMessages')
export class KingdomMessagesController {
  constructor(
    private readonly kingdomMessagesService: KingdomMessagesService,
  ) {}

  @ApiOperation({ summary: 'Create kingdom message' })
  @ApiResponse({ status: 200, description: 'Returns kingdom message' })
  @Post()
  create(@Body() createKingdomMessageDto: CreateKingdomMessageDto) {
    return this.kingdomMessagesService.create(createKingdomMessageDto);
  }

  @ApiOperation({ summary: 'Get all kingdom messages' })
  @ApiResponse({ status: 200, description: 'Returns all kingdom messages' })
  @Get()
  findAll(@Query() query: GetKingdomMessagesDto) {
    return this.kingdomMessagesService.findAllBy(query);
  }

  @ApiOperation({ summary: 'Get kingdom message by id' })
  @ApiResponse({ status: 200, description: 'Returns kingdom message by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kingdomMessagesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update kingdom message by id' })
  @ApiResponse({ status: 200, description: 'Returns kingdom message by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKingdomMessageDto: UpdateKingdomMessageDto,
  ) {
    return this.kingdomMessagesService.update(+id, updateKingdomMessageDto);
  }

  @ApiOperation({ summary: 'Delete kingdom message by id' })
  @ApiResponse({ status: 200, description: 'Deletes kingdom message by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kingdomMessagesService.remove(+id);
  }
}
