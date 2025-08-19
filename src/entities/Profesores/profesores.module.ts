import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { Profesor } from './profesores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor])],
  providers: [ProfesoresService],
  controllers: [ProfesoresController],
})
export class ProfesoresModule {}
