import { Controller, Put, Param, ParseIntPipe } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Put(':answer_id/helpful')
  async markAnswerHelpful(@Param('answer_id', ParseIntPipe) answer_id: number) {
    return this.answersService.markAnswerHelpful(answer_id);
  }

  @Put(':answer_id/report')
  async reportAnswer(@Param('answer_id', ParseIntPipe) answer_id: number) {
    return this.answersService.reportAnswer(answer_id);
  }
}
