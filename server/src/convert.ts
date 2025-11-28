import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ConvertUseCase {
  async execute(fileBuffer: Buffer) {
    if (!fileBuffer) {
      throw new Error('Arquivo inválido');
    }
    const pngBuffer = await sharp(fileBuffer).png().toBuffer();

    return pngBuffer;
  }
}
