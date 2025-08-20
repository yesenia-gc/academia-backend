import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './ level.entity';
import { CreateLevelDto} from './create- level.dto';


@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  async create(level: CreateLevelDto): Promise<Level> {
    try {
      const existingLevel = await this.levelRepository.findOne({
        where: { name: level.name },
      });

      if (existingLevel) {
        throw new ConflictException(
          `El nivel ${level.name} ya está en uso`,
        );
      }

      const newLevel = this.levelRepository.create(level);
      return await this.levelRepository.save(newLevel);
    } catch (error) {
   /*    this.logger.error(Error `al crear el usuario: ${error.message}`); */
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nivel ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el nivel');
    }
  }


  findAll(): Promise<Level[]> {
    return this.levelRepository.find();
  }
}
