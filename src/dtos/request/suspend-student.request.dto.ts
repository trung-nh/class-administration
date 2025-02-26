import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestDto {
  @IsNotEmpty()
  @IsEmail()
  student: string;
}