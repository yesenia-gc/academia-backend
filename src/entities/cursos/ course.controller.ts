import { Controller, Post, Body, Get } from '@nestjs/common';
import { CourseService} from './ course.service';
import { CreateCourseDto } from './Create- course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async create(@Body() course: CreateCourseDto) {
    try {
      const newCourse = await this.courseService.create(course);
      return {
        success: true,
        message: 'Curso creado exitosamente',
        data: newCourse
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear curso.')
    }
  }

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
