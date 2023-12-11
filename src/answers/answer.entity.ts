import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Question } from '../questions/question.entity';
import { AnswerPhoto } from './answer-photo.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  body: string;

  @Column('timestamp')
  date_written: Date;

  @Column()
  answerer_name: string;

  @Column()
  answerer_email: string;

  @Column({ default: false })
  reported: boolean;

  @Column({ default: 0 })
  helpful: number;

  @OneToMany(() => AnswerPhoto, (photo) => photo.answer)
  photos: AnswerPhoto[];
}
