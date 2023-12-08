import { IsEmail, IsString, IsInt } from 'class-validator';

export class QuestionBodyDto {
  @IsString()
  body: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  product_id: number;
}
