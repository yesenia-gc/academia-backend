import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NivelService } from './ subject.service';
import { CreateNivelDto } from './create- subject.dto';

@Controller('niveles')
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}

  @Post('create')
    async create(@Body() nivel: CreateNivelDto) {
      try {
        const newNivel = await this.nivelService.create(nivel);
        return {
          success: true,
          message: 'Nivel creado exitosamente',
          data: newNivel
        }
      } catch (error) {
        return this.handleError(error, 'Error al crear nivel.')
      }
    }
  
    @Get('list')
    findAll() {
      return this.nivelService.findAll();
    } 
  
    private handleError(error: any, defaultMessage: string) {
      return {
        success: false,
        message: error.message || defaultMessage,
        error: error.name || 'Error interno'
      };
    }
  
}
