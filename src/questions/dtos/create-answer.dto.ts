import {
  IsEmail,
  IsString,
  IsOptional,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';

export class AnswerBodyDto {
  @IsString()
  body: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  photos?: string[];
}
