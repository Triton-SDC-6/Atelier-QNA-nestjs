import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionBodyDto } from './dtos/question-body.dto';
import { AnswerBodyDto } from './dtos/answer-body.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Get()
  async getAll(
    @Query('product_id', ParseIntPipe) product_id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('count', new DefaultValuePipe(5), ParseIntPipe) count: number,
  ) {
    return this.questionsService.getAll(product_id, page, count);
  }
  @Post()
  async createOneQuestion(@Body() questionBody: QuestionBodyDto) {
    return this.questionsService.createOneQuestion(questionBody);
  }

  @Get(':question_id/answers')
  async getAllAnswerOfQuestion(
    @Param('question_id', ParseIntPipe) question_id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('count', new DefaultValuePipe(5), ParseIntPipe) count: number,
  ) {
    return this.questionsService.getAllAnswersOfQuestion(
      question_id,
      page,
      count,
    );
  }

  @Post(':question_id/answers')
  async createOneAnswer(
    @Param('question_id', ParseIntPipe) question_id: number,
    @Body() answerBody: AnswerBodyDto,
  ) {
    return this.questionsService.createOneAnswer(answerBody, question_id);
  }

  @Put(':question_id/helpful')
  async markQuestionHelpful(
    @Param('question_id', ParseIntPipe) question_id: number,
  ) {
    return this.questionsService.markQuestionHelpful(question_id);
  }

  @Put(':question_id/report')
  async reportQuestion(
    @Param('question_id', ParseIntPipe) question_id: number,
  ) {
    return this.questionsService.reportQuestion(question_id);
  }
}
