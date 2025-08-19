import { Controller, Post, Body, Get } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './create-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post('create')
  async create(@Body() curso: CreateCursoDto) {
    try {
      const newCurso = await this.cursoService.create(curso);
      return {
        success: true,
        message: 'Curso creado exitosamente',
        data: newCurso
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear curso.')
    }
  }

  @Get('list')
  findAll() {
    return this.cursoService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
