import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswersService {
  async markAnswerHelpful(answer_id: number) {
    return `Mark answer_id: ${answer_id} as helpful`; // FIXME:
  }

  async reportAnswer(answer_id: number) {
    return `Report answer_id: ${answer_id}`; // FIXME:
  }
}
