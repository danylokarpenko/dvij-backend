import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  // UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddFriendDto } from './dto/add-friend.dto';
import { UpdateFriendInfoDto } from './dto/update-friend-info.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Add friend' })
  @ApiResponse({ status: 200, description: 'Add friend to user.' })
  @Post('/addFriend')
  addFriend(@Body() addFriendPayload: AddFriendDto) {
    return this.usersService.addToFriend(addFriendPayload);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Returns user.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Start screen' })
  @ApiResponse({ status: 200, description: 'Get user start screen info' })
  @Get('/start-screen')
  getStartScreenInfo(@Req() req) {
    return this.usersService.getStartScreenInfo(req);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Returns user by id.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'Returns user by id.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Update friend' })
  @ApiResponse({ status: 200, description: 'Update friend info' })
  @Patch(':friendId')
  updateFriend(
    @Param('friendId', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateFriendInfoDto,
    @Req() req,
  ) {
    return this.usersService.updateFriend(id, updateUserDto, req);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'Deletes user by id.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
