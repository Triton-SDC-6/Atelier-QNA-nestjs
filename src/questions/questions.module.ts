import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Answer } from 'src/answers/answer.entity';
import { AnswerPhoto } from 'src/answers/answer-photo.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, AnswerPhoto])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
