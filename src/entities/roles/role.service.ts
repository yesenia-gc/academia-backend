import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(role: CreateRoleDto): Promise<Role> {
    try {
      const existingRole = await this.roleRepository.findOne({
        where: { name: role.name },
      });
      if (existingRole) {
        throw new ConflictException(
          `El rol ${role.name} ya está en uso`,
        );
      }

      const newRole = this.roleRepository.create(role);
      return await this.roleRepository.save(newRole);
    } catch (error) {
   /*    this.logger.error(Error `al crear el usuario: ${error.message}`); */
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El rol ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el rol');
    }
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
