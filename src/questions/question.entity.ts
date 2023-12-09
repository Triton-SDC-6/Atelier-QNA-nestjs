import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from 'src/answers/answer.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  body: string;

  @Column('timestamp')
  date_written: Date;

  @Column()
  asker_name: string;

  @Column()
  asker_email: string;

  @Column({ default: false })
  reported: boolean;

  @Column({ default: 0 })
  helpful: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
