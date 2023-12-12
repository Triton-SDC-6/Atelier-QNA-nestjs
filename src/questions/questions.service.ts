import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Answer } from '../answers/answer.entity';
import { AnswerPhoto } from '../answers/answer-photo.entity';
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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getAll(
    product_id: number,
    page: number = 1,
    count: number = 5,
    show_all: boolean = false,
  ) {
    const cachedProduct = await this.cacheManager.get(product_id.toString());
    if (cachedProduct) {
      return cachedProduct;
    }
    const questions = await this.questionRepo.find({
      where: { product_id, reported: false },
      take: count,
      skip: (page - 1) * count,
    });

    for (const question of questions) {
      const queryObj: any = {
        where: { question: { id: question.id }, reported: false },
        relations: ['photos'],
      };
      if (!show_all) {
        queryObj.take = 5;
      }
      const answers = await this.answerRepo.find(queryObj);
      question.answers = answers;
    }
    await this.cacheManager.set(product_id.toString(), questions);
    return questions;
  }

  async createOneQuestion(questionBody: QuestionBodyDto) {
    const bodyToWrite = new Question();

    bodyToWrite.product_id = questionBody.product_id;
    bodyToWrite.body = questionBody.body;
    bodyToWrite.date_written = new Date();
    bodyToWrite.asker_name = questionBody.name;
    bodyToWrite.asker_email = questionBody.email;

    const newQuestion = await this.questionRepo.create(bodyToWrite);
    return this.questionRepo.save(newQuestion);
  }

  async getAllAnswersOfQuestion(
    question_id: number,
    page: number = 1,
    count: number = 5,
  ) {
    const answers = await this.answerRepo.find({
      where: { question: { id: question_id }, reported: false },
      relations: ['photos'],
      take: count,
      skip: (page - 1) * count,
    });
    return answers;
  }

  async createOneAnswer(answerBody: AnswerBodyDto, question_id: number) {
    const relatedQuestion = await this.questionRepo.findOne({
      where: { id: question_id },
    });
    if (!relatedQuestion) {
      throw new NotFoundException('question_id do not exist');
    }
    const answerToWrite = new Answer();
    answerToWrite.question = relatedQuestion;
    answerToWrite.body = answerBody.body;
    answerToWrite.date_written = new Date();
    answerToWrite.answerer_name = answerBody.name;
    answerToWrite.answerer_email = answerBody.email;

    const newAnswer = await this.answerRepo.create(answerToWrite);
    const savedAnswer = await this.answerRepo.save(newAnswer);
    let savedPhotos: AnswerPhoto[];

    if (answerBody.photos && answerBody.photos.length > 0) {
      const photosToSave = answerBody.photos.map((photoUrl) => {
        const photoToCreate = new AnswerPhoto();
        photoToCreate.url = photoUrl;
        photoToCreate.answer = savedAnswer;
        return this.answerPhotoRepo.create(photoToCreate);
      });
      savedPhotos = await this.answerPhotoRepo.save(photosToSave);
    }
    return { savedAnswer, savedPhotos };
  }

  async markQuestionHelpful(question_id: number) {
    await this.questionRepo.increment({ id: question_id }, 'helpful', 1);
    return this.questionRepo.findOneBy({ id: question_id });
  }

  async reportQuestion(question_id: number) {
    await this.questionRepo.update(question_id, { reported: true });
    return this.questionRepo.findOneBy({ id: question_id });
  }
}
