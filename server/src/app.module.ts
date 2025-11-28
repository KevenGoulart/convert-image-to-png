import { Module } from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertUseCase } from './convert';

@Module({
  imports: [],
  controllers: [ConvertController],
  providers: [ConvertUseCase],
})
export class AppModule {}
