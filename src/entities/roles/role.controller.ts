import { Controller, Post, Body, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './create-role.dto';
import { UpdateRoleDto } from './update-role.dto';

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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ) {
    return this.roleService.update(id, role);
  }
}
