import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { RegisterStudentsDto } from '../dtos/request/register-students.dto';
import { GetCommonStudentsDto } from '../dtos/response/get-common-students.dto';
import { TestDto } from '../dtos/request/test.dto';

@Controller('/api')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsDto: RegisterStudentsDto,
  ): Promise<void> {
    await this.teachersService.registerStudents(registerStudentsDto);
  }

  @Get('/commonstudents')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  getCommonStudents(
    @Query('teacher', new ParseArrayPipe({ items: String }))
    teacherEmails: string[],
  ): Promise<GetCommonStudentsDto> {
    return this.teachersService.getCommonStudents(teacherEmails);
  }

  @Post('/test')
  test(@Body() body: TestDto) {
    return body;
  }
}
