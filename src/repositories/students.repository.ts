import { DataSource, In, Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Injectable } from '@nestjs/common';

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
}
