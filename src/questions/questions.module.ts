import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Answer } from '../answers/answer.entity';
import { AnswerPhoto } from '../answers/answer-photo.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer, AnswerPhoto]),
    CacheModule.register({ ttl: 5 * 60 * 1000, max: 200 }),
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
