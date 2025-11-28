import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ConvertUseCase } from './convert';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convert: ConvertUseCase) {}

  @Post() @UseInterceptors(FileInterceptor('file')) async handle(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const output = await this.convert.execute(file.buffer);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="converted.png"',
    );

    return res.send(output);
  }
}
