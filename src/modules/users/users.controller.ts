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
  UseGuards,
  Query,
  // UploadedFile,
  // UseInterceptors,
  // FileTypeValidator,
  // MaxFileSizeValidator,
  // ParseFilePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
// import { diskStorage } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddFriendDto } from './dto/add-friend.dto';
import { UpdateFriendInfoDto } from './dto/update-friend-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindUsersDto } from './dto/find-users.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { AddTraitDto } from './dto/add-trait.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, cb) => {
  //         const fileNameSplit = file.originalname.split('');
  //         const fileExt = fileNameSplit[fileNameSplit.length - 1];
  //         cb(null, `${Date.now()}.${fileExt}`);
  //       },
  //     }),
  //   }),
  // )
  // @ApiOperation({ summary: 'Upload file' })
  // @ApiResponse({
  //   status: 200,
  //   description:
  //     'https://www.c-sharpcorner.com/article/upload-files-or-images-to-server-using-node-js/',
  // })
  // @Post('/upload-avatar')
  // uploadAvatar(
  //   @Req() req,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   console.log(file);
  //   this.usersService.uploadAvatar(req, file);
  // }

  @ApiOperation({ summary: 'Add friend' })
  @ApiResponse({ status: 200, description: 'Add friend to user' })
  @Post('/addFriend')
  addFriend(@Body() addFriendPayload: AddFriendDto) {
    return this.usersService.addToFriend(addFriendPayload);
  }

  @ApiOperation({ summary: 'Add trait' })
  @ApiResponse({ status: 200, description: 'Add trait to user' })
  @Post('/addTrait')
  addTrait(@Body() addTraitPayload: AddTraitDto) {
    return this.usersService.addTraitToUser(addTraitPayload);
  }

  @ApiOperation({ summary: 'Get traits' })
  @ApiResponse({ status: 200, description: 'Get user traits' })
  @Get('/traits/:userId')
  getUserTraits(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUserTraits(userId);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Returns user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  @Get()
  findAll(@Query() query: FindUsersDto) {
    return this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Start screen' })
  @ApiResponse({ status: 200, description: 'Get user start screen info' })
  @Get('/start-screen')
  getStartScreenInfo(@Req() req: IRequest) {
    return this.usersService.getStartScreenInfo(req);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Returns user by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'Returns user by id' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update friend' })
  @ApiResponse({ status: 200, description: 'Update friend info' })
  @Patch('friends/:friendId')
  updateFriend(
    @Param('friendId', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateFriendInfoDto,
    @Req() req,
  ) {
    return this.usersService.updateFriend(id, updateUserDto, req);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'Deletes user by id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
