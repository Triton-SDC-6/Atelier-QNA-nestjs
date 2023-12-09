import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity('answers_photos')
export class AnswerPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Answer, (answer) => answer.photos)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;

  @Column()
  url: string;
}
