import { DataSource, Repository } from 'typeorm';
import { TeacherStudent } from '../entities/teacher-student.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherStudentsRepository extends Repository<TeacherStudent> {
  constructor(private dataSource: DataSource) {
    super(TeacherStudent, dataSource.createEntityManager());
  }
}
