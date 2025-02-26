import { PartialType } from '@nestjs/mapped-types';
import { TestDto } from './test.dto';

export class UpdateTeacherDto extends PartialType(TestDto) {}