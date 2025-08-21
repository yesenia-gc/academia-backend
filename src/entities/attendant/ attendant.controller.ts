import { Controller, Post, Body, Get } from '@nestjs/common';
import { AttendantService } from './ attendant.service';
import { CreateAttendantDto } from './Create- attendant.dto';

@Controller('Attendants')
export class AttendantController {
  constructor(private readonly attendantService: AttendantService) {}

  @Post('create')
  async create(@Body() attendant: CreateAttendantDto) {
    try {
      const newAttendant = await this.attendantService.create(attendant);
      return {
        success: true,
        message: 'Acudiente creado exitosamente',
        data: newAttendant
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear acudiente.')
    }
  }

  @Get('list')
  findAll() {
    return this.attendantService.findAll();
  } 

  private handleError(error: any, defaultMessage: string) {
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error.name || 'Error interno'
    };
  }
}
