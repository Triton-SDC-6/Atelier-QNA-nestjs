import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('QuestionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/questions?product_id=1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/questions?product_id=1')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].answers).toBeInstanceOf(Array);
        expect(response.body[0].answers[0].photos).toBeInstanceOf(Array);
        expect(response.body[0].product_id).toBe(1);
      });
  });

  it('/questions?product_id=2&count=1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/questions?product_id=2&count=1')
      .expect(200)
      .then((response) => {
        expect(response.body[0].product_id).toBe(2);
        expect(response.body.length).toBe(1);
      });
  });

  it('/questions/1/answers (GET)', () => {
    return request(app.getHttpServer())
      .get('/questions/1/answers')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].photos).toBeInstanceOf(Array);
      });
  });
});
