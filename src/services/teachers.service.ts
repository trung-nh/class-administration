import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterStudentsRequestDto } from '../dtos/request/register-students.request.dto';
import { Teacher } from '../entities/teacher.entity';
import { TeachersRepository } from '../repositories/teachers.repository';
import { StudentsRepository } from '../repositories/students.repository';
import { TeacherStudentsRepository } from '../repositories/teacher-students.repository';
import { Student } from '../entities/student.entity';
import { TeacherStudent } from '../entities/teacher-student.entity';
import { GetCommonStudentsResponseDto } from '../dtos/response/get-common-students.response.dto';
import { SuspendStudentRequestDto } from '../dtos/request/suspend-student.request.dto';
import { RetrieveNotificationsRequestDto } from '../dtos/request/retrieve-notifications.request.dto';
import { RetrieveNotificationsResponseDto } from '../dtos/response/retrieve-notifications.response.dto';
import { ExtractEmailMentioningUtils } from '../utils/extractEmailMentioning.utils';

@Injectable()
export class TeachersService {
  constructor(
    private readonly teacherRepository: TeachersRepository,
    private readonly studentRepository: StudentsRepository,
    private readonly teacherStudentRepository: TeacherStudentsRepository,
  ) {}

  async registerStudents(
    registerStudentsDto: RegisterStudentsRequestDto,
  ): Promise<void> {
    try {
      // check teacher's existence
      let existingTeacher: Teacher | null =
        await this.teacherRepository.getOneByEmail(registerStudentsDto.teacher);

      if (!existingTeacher) {
        throw new HttpException(
          'Teacher with such email does not exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      // check students' existence
      let existingStudents: Student[] =
        await this.studentRepository.getListByEmail(
          registerStudentsDto.students,
        );

      if (existingStudents.length != registerStudentsDto.students.length) {
        throw new HttpException(
          'Some of the students do not exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      // register students
      let newTeacherStudents: TeacherStudent[] = existingStudents.map(
        (student: Student): TeacherStudent => {
          return {
            teacher: existingTeacher,
            student: student,
          };
        },
      );
      await this.teacherStudentRepository.save(newTeacherStudents);
    } catch (error) {
      throw error;
    }
  }

  async getCommonStudents(
    teacherEmails: string[],
  ): Promise<GetCommonStudentsResponseDto> {
    try {
      // check teachers' existence
      let teachers: Teacher[] =
        await this.teacherRepository.getListByEmail(teacherEmails);
      if (!teachers || teachers.length != teacherEmails.length) {
        throw new HttpException(
          'Some of the teachers do not exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      let commonStudents: Student[] =
        await this.studentRepository.getCommonStudents(teachers);
      let result: string[] =
        commonStudents?.map((student: Student) => student.email) || [];
      return { students: result };
    } catch (error) {
      throw error;
    }
  }

  async suspendStudent(
    suspendStudentDto: SuspendStudentRequestDto,
  ): Promise<void> {
    try {
      // check student's existence
      let existingStudent = await this.studentRepository.getOneByEmail(
        suspendStudentDto.student,
      );
      if (!existingStudent) {
        throw new HttpException(
          'No student with such email found!',
          HttpStatus.NOT_FOUND,
        );
      }

      // suspend
      await this.studentRepository.suspendStudent(existingStudent);
    } catch (error) {
      throw error;
    }
  }

  async retrieveNotifications({
    teacher,
    notification,
  }: RetrieveNotificationsRequestDto): Promise<RetrieveNotificationsResponseDto> {
    try {
      // check teacher's existence
      let existingTeacher = await this.teacherRepository.getOneByEmail(teacher);
      if (!existingTeacher) {
        throw new HttpException(
          'No teacher with such email found!',
          HttpStatus.NOT_FOUND,
        );
      }

      // extract mentioned students
      const mentionedStudents: string[] =
        ExtractEmailMentioningUtils.exec(notification);
      // retrieve notifications
      const students: Student[] =
        await this.studentRepository.retrieveNotifications(
          existingTeacher.id,
          mentionedStudents,
        );
      // return
      return { recipients: students.map((student) => student.email) || [] };
    } catch (error) {
      throw error;
    }
  }
}
