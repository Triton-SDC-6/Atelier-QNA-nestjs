import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/question.entity';
import { Answer } from './answers/answer.entity';
import { AnswerPhoto } from './answers/answer-photo.entity';

@Module({
  imports: [
    QuestionsModule,
    AnswersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lance',
      database: 'qna',
      entities: [Question, Answer, AnswerPhoto],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
