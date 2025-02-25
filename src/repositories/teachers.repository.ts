import { DataSource, In, Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeachersRepository extends Repository<Teacher> {
  constructor(private datasource: DataSource) {
    super(Teacher, datasource.createEntityManager());
  }

  getOneByEmail(email: string): Promise<Teacher | null> {
    return this.findOne({
      where: { email },
    });
  }

  getListByEmail(emails: string[]): Promise<Teacher[]> {
    return this.find({
      where: { email: In(emails) },
    });
  }
}
