import { Module } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { TeachersController } from '../controllers/teachers.controller';
import { TeachersRepository } from '../repositories/teachers.repository';
import { StudentsRepository } from '../repositories/students.repository';
import { TeacherStudentsRepository } from '../repositories/teacher-students.repository';

@Module({
  controllers: [TeachersController],
  providers: [
    TeachersService,
    TeachersRepository,
    StudentsRepository,
    TeacherStudentsRepository,
  ],
})
export class TeachersModule {}
