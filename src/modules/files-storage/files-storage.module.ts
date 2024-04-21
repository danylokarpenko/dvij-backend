// game.module.ts

import { Module } from '@nestjs/common';
import { FileStorageController } from './files-storage.controller';
import { FileStorageService } from './files-storage.service';

@Module({
  imports: [],
  controllers: [FileStorageController],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
