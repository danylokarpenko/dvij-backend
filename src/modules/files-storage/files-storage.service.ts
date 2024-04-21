import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { extname, join } from 'path';
import { createReadStream, existsSync } from 'fs';
import * as fs from 'fs';

@Injectable()
export class FileStorageService {
  getFile(query) {
    const filePth = join(process.cwd(), `/files/${query.name}`);
    const isAvatarExist = existsSync(filePth);
    if (!isAvatarExist) {
      throw new BadRequestException(`No file exist with name '${query.name}'`);
    }

    const file = createReadStream(filePth);
    return new StreamableFile(file);
  }

  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const timestamp = Date.now();
    let filename = file.originalname.replace(/\s/g, ''); // remove spaces
    filename = filename.substring(0, 10); // limit to max length of 10
    const extension = extname(file.originalname); // get file extension
    filename = `${filename}_${timestamp}${extension}`; // append timestamp and extension
    const uploadPath = join(__dirname, '../../../..', 'files', filename);

    await fs.promises.writeFile(uploadPath, file.buffer);
    return `http://localhost:3030/api/v1/get-file?name=${filename}`;
  }
}
