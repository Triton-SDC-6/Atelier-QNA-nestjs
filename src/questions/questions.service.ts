import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Answer } from 'src/answers/answer.entity';
import { AnswerPhoto } from 'src/answers/answer-photo.entity';
import { QuestionBodyDto } from './dtos/question-body.dto';
import { AnswerBodyDto } from './dtos/answer-body.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepo: Repository<Answer>,
    @InjectRepository(AnswerPhoto)
    private readonly answerPhotoRepo: Repository<AnswerPhoto>,
  ) {}

  async getAll(product_id: number, page: number = 1, count: number = 5) {
    const questions = await this.questionRepo.find({
      where: { product_id, reported: false },
      relations: ['answers', 'answers.photos'],
      take: count,
      skip: (page - 1) * count,
    });

    return questions;
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
    const answers = await this.answerRepo.find({
      where: { question: { id: question_id } },
      relations: ['photos'],
      take: count,
      skip: (page - 1) * count,
    });
    return answers;
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
