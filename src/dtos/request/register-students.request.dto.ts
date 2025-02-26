import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsRequestDto {
  @IsNotEmpty()
  @IsEmail()
  teacher: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  students: string[];
}