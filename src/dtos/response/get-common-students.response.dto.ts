import { IsArray, IsEmail } from 'class-validator';

export class GetCommonStudentsResponseDto {
  @IsArray()
  @IsEmail({}, { each: true })
  students: string[];
}