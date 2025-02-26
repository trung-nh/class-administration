import { Contains, IsEmail, IsNotEmpty } from 'class-validator';

export class TestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Contains('trung')
  name: string;
}