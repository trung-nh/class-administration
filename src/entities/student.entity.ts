import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherStudent } from './teacher-student.entity';
import { Teacher } from './teacher.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    length: 255,
    unique: true,
  })
  email: string;

  @Column({ name: 'is_suspended', type: 'tinyint', default: 0 })
  isSuspended: boolean;

  @OneToMany(
    () => TeacherStudent,
    (teacherStudent: TeacherStudent) => teacherStudent.student,
  )
  public teachers: Teacher[];
}
