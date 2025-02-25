import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { RegisterStudentsDto } from '../dtos/request/register-students.dto';

@Controller('/api')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsDto: RegisterStudentsDto,
  ): Promise<void> {
    await this.teachersService.registerStudents(registerStudentsDto);
  }

  @Get()
  findAll() {
    return 'this.teachersService.findAll()';
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.teachersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
  //   return this.teachersService.update(+id, updateTeacherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teachersService.remove(+id);
  // }
}
