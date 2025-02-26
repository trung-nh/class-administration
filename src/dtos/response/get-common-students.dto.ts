import { IsArray, IsEmail } from 'class-validator';

export class GetCommonStudentsDto {
  @IsArray()
  @IsEmail({}, { each: true })
  students: string[];
}