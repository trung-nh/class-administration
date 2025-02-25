import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherStudent } from './teacher-student.entity';
import { Student } from './student.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    length: 255,
    unique: true,
  })
  email: string;

  @OneToMany(
    () => TeacherStudent,
    (teacherStudent: TeacherStudent) => teacherStudent.teacher,
  )
  public students: Student[];
}
