import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity('teacher_student')
export class TeacherStudent {
  @PrimaryColumn({ name: 'teacher_id', type: 'int' })
  teacherId?: number;

  @PrimaryColumn({ name: 'student_id', type: 'int' })
  studentId?: number;

  @ManyToOne(() => Student, (student: Student) => student.teachers)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student?: Student;

  @ManyToOne(() => Teacher, (teacher: Teacher) => teacher.students)
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teacher?: Teacher | null;
}
