import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileStorageService } from './files-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 500000; // 500 KB

@Controller()
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get('/get-file')
  @ApiOperation({ summary: 'Get file' })
  @ApiResponse({
    status: 200,
    description: 'Download the file by name',
  })
  getFile(@Query() query): StreamableFile | BadRequestException {
    return this.fileStorageService.getFile(query);
  }

  @Post('/upload-file')
  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({
    status: 200,
    description: 'Upload the file',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileStorageService.uploadFile(file);
  }
}
