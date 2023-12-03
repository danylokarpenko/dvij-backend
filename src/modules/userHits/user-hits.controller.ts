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
import { UserHitsService } from './user-hits.service';
import { CreateUserHitsDto } from './dto/create-userHit.dto';
import { UpdateUserHitsDto } from './dto/update-userHit.dto';
import { FindAllUserHitsQueryDto } from './dto/find-all-user-hits-query.dto';

@Controller('user-hits')
export class UserHitsController {
  constructor(private readonly userHitsService: UserHitsService) {}

  @Post()
  create(@Body() body: CreateUserHitsDto) {
    return this.userHitsService.create(body);
  }

  @Get()
  findAll(@Query() query: FindAllUserHitsQueryDto) {
    return this.userHitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHitsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserHitsDto) {
    return this.userHitsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHitsService.remove(+id);
  }
}
