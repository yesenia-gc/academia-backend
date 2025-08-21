import { Controller, Post, Body, Get } from '@nestjs/common';
import { CoordinatorService } from './ coordinator.service';
import { CreateCoordinatorDto } from './Create- coordinator.dto';

@Controller('coordinators')
export class CoordinatorController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Post('create')
  async create(@Body() coordinator: CreateCoordinatorDto) {
    try {
      const newCoordinator = await this.coordinatorService.create(coordinator);
      return {
        success: true,
        message: 'Coordinador creado exitosamente',
        data: newCoordinator
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear coordinador.')
    }
  }

  @Get('list')
  findAll() {
    return this.coordinatorService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
