import { Get, Post, Body, Param, Put, Delete, ParseIntPipe, Controller } from '@nestjs/common';
import { LevelService } from './ level.service';
import { CreateLevelDto } from './create- level.dto';
import { UpdateLevelDto } from './update- level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('create')
  async create(@Body() level: CreateLevelDto) {
    try {
      const newLevel = await this.levelService.create(level);
      return {
        success: true,
        message: 'Level creado exitosamente',
        data: newLevel
      }
    } catch (error) {
      return this.handleError(error, 'Error al crear level.')
    }
  }
  
  @Get('list')
  findAll() {
    return this.levelService.findAll();
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
    return this.levelService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() level: UpdateLevelDto,
  ) {
    return this.levelService.update(id, level);
  }
}
