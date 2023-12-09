import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswersService],
  controllers: [AnswersController],
})
export class AnswersModule {}
