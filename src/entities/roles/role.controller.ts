import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async create(@Body() role: CreateRoleDto) {
    try {
      const newRole = await this.roleService.create(role);
      return {
        success: true,
        message: 'Rol creado exitosamente',
        data: newRole
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear rol.')
    }
  }

  @Get('list')
  findAll() {
    return this.roleService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
