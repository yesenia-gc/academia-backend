import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeachersService } from './teacher.service';
import { CreateTeacherDto } from './create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Post('create')
  async create(@Body() teacher: CreateTeacherDto) {
    try {
      const newTeacher = await this.teacherService.create(teacher);
      return {
        success: true,
        message: 'El profesor fue creado exitosamente',
        data: newTeacher
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear profesor.')
    }
  }

  @Get('list')
  findAll() {
    return this.teacherService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
