import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './create-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async create(rol: CreateRolDto): Promise<Rol> {
    try {
      const existingRol = await this.rolRepository.findOne({
        where: { name: rol.name },
      });
      if (existingRol) {
        throw new ConflictException(
          `El rol ${rol.name} ya está en uso`,
        );
      }

      const newRol = this.rolRepository.create(rol);
      return await this.rolRepository.save(newRol);
    } catch (error) {
   /*    this.logger.error(Error `al crear el usuario: ${error.message}`); */
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El rol ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el rol');
    }
  }

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }
}
