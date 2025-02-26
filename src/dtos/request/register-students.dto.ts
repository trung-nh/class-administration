import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsDto {
  @IsNotEmpty()
  @IsEmail()
  teacher: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  students: string[];
}