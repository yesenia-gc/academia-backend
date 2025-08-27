import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { SubjectService } from './ subject.service';
import { CreateSubjectDto } from './create- subject.dto';
import { UpdateSubjectDto } from './update- subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('create')
  async create(@Body() subject: CreateSubjectDto) {
    try {
      const newSubject = await this.subjectService.create(subject)
      return {
        success: true,
        message: 'Materia creada exitosamente',
        data: newSubject
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear la materia.')
    }
  }
  
  @Get('list')
  findAll() {
    return this.subjectService.findAll();
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
    return this.subjectService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() subject: UpdateSubjectDto,
  ) {
    return this.subjectService.update(id, subject);
  }
  
}
