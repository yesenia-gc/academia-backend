import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './profesores.entity';
import { CreateProfesorDto } from './create-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async create(profesor: CreateProfesorDto): Promise<Profesor> {
    try {
      const existingProfesor = await this.profesorRepository.findOne({
        where: { nombre: profesor.nombre },
      });
      if (existingProfesor) {
        throw new ConflictException (
          `El profesor ya se encuentra`,
        );
      }

      const newProfesor = this.profesorRepository.create(profesor);
      return await this.profesorRepository.save(newProfesor);
    } catch (error) {
      
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El profesor ya está registrado');
      }

      throw new InternalServerErrorException ('Error al registrar al profesor');
    }
  }

  findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }
}