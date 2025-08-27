import { Controller, Post, Body, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StudentService } from './ student.service';
import { CreateStudentDto } from './Create- student.dto';
import { UpdateStudentDto } from './update- student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() student: CreateStudentDto) {
    try {
      const newStudent = await this.studentService.create(student);
      return {
        success: true,
        message: 'Estudiante creado exitosamente',
        data: newStudent
      }
    } catch (error) {
      console.log(error)
      return this.handleError(error, 'Error al crear estudiante.')
    }
  }

  @Get('list')
  findAll() {
    return this.studentService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
  ) {
    return this.studentService.update(id, student);
  }
}
