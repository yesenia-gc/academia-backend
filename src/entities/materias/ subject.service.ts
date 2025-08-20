import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './ subject.entity';
import { CreateNivelDto } from './create- subject.dto';


@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private nivelRepository: Repository<Nivel>,
  ) {}

  async create(nivel: CreateNivelDto): Promise<Nivel> {
    try {
      const existingNivel = await this.nivelRepository.findOne({
        where: { nombre: nivel.nombre },
      });
      
      if (existingNivel) {
        throw new ConflictException(
          `El nivel ${nivel.nombre} ya está en uso`,
        );
      }

      const newNivel = this.nivelRepository.create(nivel);
      return await this.nivelRepository.save(newNivel);
    } catch (error) {
   /*    this.logger.error(Error `al crear el usuario: ${error.message}`); */
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nivel ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el nivel');
    }
  }


  findAll(): Promise<Nivel[]> {
    return this.nivelRepository.find();
  }
}
