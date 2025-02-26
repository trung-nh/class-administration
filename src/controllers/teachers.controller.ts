import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { RegisterStudentsRequestDto } from '../dtos/request/register-students.request.dto';
import { GetCommonStudentsResponseDto } from '../dtos/response/get-common-students.response.dto';
import { TestDto } from '../dtos/request/test.dto';
import { SuspendStudentRequestDto } from '../dtos/request/suspend-student.request.dto';
import { RetrieveNotificationsRequestDto } from '../dtos/request/retrieve-notifications.request.dto';
import { RetrieveNotificationsResponseDto } from '../dtos/response/retrieve-notifications.response.dto';

@Controller('/api')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsDto: RegisterStudentsRequestDto,
  ): Promise<void> {
    await this.teachersService.registerStudents(registerStudentsDto);
  }

  @Get('/commonstudents')
  @HttpCode(HttpStatus.OK)
  getCommonStudents(
    @Query('teacher', new ParseArrayPipe({ items: String }))
    teacherEmails: string[],
  ): Promise<GetCommonStudentsResponseDto> {
    return this.teachersService.getCommonStudents(teacherEmails);
  }

  @Post('/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  suspendStudent(
    @Body() suspendStudentDto: SuspendStudentRequestDto,
  ): Promise<void> {
    return this.teachersService.suspendStudent(suspendStudentDto);
  }

  @Post('/retrievefornotifications')
  @HttpCode(HttpStatus.OK)
  retrieveNotifications(
    @Body() retrieveNotificationsDto: RetrieveNotificationsRequestDto,
  ): Promise<RetrieveNotificationsResponseDto> {
    return this.teachersService.retrieveNotifications(retrieveNotificationsDto);
  }

  @Post('/test')
  test(@Body() body: TestDto) {
    return body;
  }
}
