import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './create-rol.dto';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('create')
  async create(@Body() rol: CreateRolDto) {
    try {
      const newRol = await this.rolService.create(rol);
      return {
        success: true,
        message: 'Rol creado exitosamente',
        data: newRol
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear rol.')
    }
  }

  @Get('list')
  findAll() {
    return this.rolService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
