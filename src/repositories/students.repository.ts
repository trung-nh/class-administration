import { DataSource, In, Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Injectable } from '@nestjs/common';
import { Teacher } from '../entities/teacher.entity';
import { TeacherStudent } from '../entities/teacher-student.entity';

@Injectable()
export class StudentsRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  getOneByEmail(email: string): Promise<Student | null> {
    return this.findOne({
      where: { email },
    });
  }

  getListByEmail(emails: string[]): Promise<Student[]> {
    return this.findBy({ email: In(emails) });
  }

  getCommonStudents(teachers: Teacher[]): Promise<Student[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Student, 's')
      .innerJoin(
        (sub) =>
          sub
            .select('ts.student_id')
            .from(TeacherStudent, 'ts')
            .where(`ts.teacher_id IN (${teachers.map((t) => t.id).join(',')})`)
            .groupBy('ts.student_id')
            .having(`COUNT(ts.student_id) = ${teachers.length}`),
        'subQuery',
        'subQuery.student_id=s.id',
      )
      .execute();
  }

  suspendStudent(student: Student) {
    return this.createQueryBuilder()
      .update()
      .set({ isSuspended: true })
      .where({ id: student.id })
      .execute();
  }
}
