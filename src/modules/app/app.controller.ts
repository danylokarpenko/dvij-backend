import {
  BadRequestException,
  Controller,
  Get,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-file')
  @ApiOperation({ summary: 'Get file' })
  @ApiResponse({
    status: 200,
    description: 'Download the file by name',
  })
  getFile(@Query() query): StreamableFile | BadRequestException {
    const filePth = join(process.cwd(), `/files/${query.name}`);
    const isAvatarExist = existsSync(filePth);
    if (!isAvatarExist) {
      throw new BadRequestException(`No file exist with name '${query.name}'`);
    }

    const file = createReadStream(filePth);
    return new StreamableFile(file);
  }
}
