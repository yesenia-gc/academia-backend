import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './create-profesor.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesorService: ProfesoresService) {}

  @Post('create')
  async create(@Body() profesor: CreateProfesorDto) {
    try {
      const newProfesor = await this.profesorService.create(profesor);
      return {
        success: true,
        message: 'El profesor fue creado exitosamente',
        data: newProfesor
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear profesor.')
    }
  }

  @Get('list')
  findAll() {
    return this.profesorService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
