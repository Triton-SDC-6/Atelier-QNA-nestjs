import { Injectable } from '@nestjs/common';
import { QuestionBodyDto } from './dtos/create-question.dto';
import { AnswerBodyDto } from './dtos/create-answer.dto';

@Injectable()
export class QuestionsService {
  async getAll(product_id: number, page: number = 1, count: number = 5) {
    return `Should return ${count} questions on page ${page} related to the product_id: ${product_id} with answers and photos`; // FIXME:
  }

  async createOneQuestion(questionBody: QuestionBodyDto) {
    // FIXME: create Question
    return questionBody;
  }

  async getAllAnswersOfQuestion(
    question_id: number,
    page: number = 1,
    count: number = 5,
  ) {
    return `Should return page ${page} of ${count} answers related to the question_id: ${question_id} with photos`; // FIXME:
  }

  async createOneAnswer(answerBody: AnswerBodyDto, question_id: number) {
    return {
      ...answerBody,
      message: `Should create a answer to  question_id: ${question_id} with photos`,
    };
  }

  async markQuestionHelpful(question_id: number) {
    return `Mark question_id: ${question_id} as helpful`; // FIXME:
  }

  async reportQuestion(question_id: number) {
    return `Report question_id: ${question_id}`; // FIXME:
  }
}
