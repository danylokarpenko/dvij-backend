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
import { FindAllUserPayRatesQueryDto } from './dto/find-all-user-pay-rates-query.dto';
import { UserPayRatesService } from './userPayRate.service';
import { CreateUserPayRateDto } from './dto/create-userPayRate.dto';
import { UpdateUserPayRateDto } from './dto/update-userPayRate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('user-pay-rates')
export class UserPayRatesController {
  constructor(private readonly userPayRatesService: UserPayRatesService) {}

  @Post()
  create(@Body() createUserPayRateDto: CreateUserPayRateDto) {
    return this.userPayRatesService.create(createUserPayRateDto);
  }

  @Get()
  findAll(@Query() query: FindAllUserPayRatesQueryDto) {
    return this.userPayRatesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPayRatesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPayRateDto: UpdateUserPayRateDto,
  ) {
    return this.userPayRatesService.update(+id, updateUserPayRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPayRatesService.remove(+id);
  }
}
