import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private readonly answerRepo: Repository<Answer>,
  ) {}

  async markAnswerHelpful(answer_id: number) {
    await this.answerRepo.increment({ id: answer_id }, 'helpful', 1);
    return this.answerRepo.findOneBy({ id: answer_id });
  }

  async reportAnswer(answer_id: number) {
    await this.answerRepo.update(answer_id, { reported: true });
    return this.answerRepo.findOneBy({ id: answer_id });
  }
}
