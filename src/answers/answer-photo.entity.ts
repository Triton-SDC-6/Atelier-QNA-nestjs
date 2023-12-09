import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Answer } from './answer.entity';

@Entity('answers_photos')
export class AnswerPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Answer, (answer) => answer.photos)
  answer: Answer;

  @Column()
  url: string;
}
