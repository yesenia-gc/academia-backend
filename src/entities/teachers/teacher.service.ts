import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(teacher: CreateTeacherDto): Promise<Teacher> {
    try {
      const existingTeacher = await this.teacherRepository.findOne({
        where: { name: teacher.name },
      });
      if (existingTeacher) {
        throw new ConflictException (
          `El profesor ya se encuentra`,
        );
      }

      const newTeacher = this.teacherRepository.create(teacher);
      return await this.teacherRepository.save(newTeacher);
    } catch (error) {
      
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El profesor ya está registrado');
      }

      throw new InternalServerErrorException ('Error al registrar al profesor');
    }
  }

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({ id });
    if (!teacher) {
        throw new ConflictException(`El profesor con id ${id} no existe`);
    }
    return teacher;
    }

    async update(id: number, teacherData: CreateTeacherDto): Promise<Teacher> {
    const teacher = await this.findOne(id); // primero valida que exista
    await this.teacherRepository.update(id, teacherData);
    return this.findOne(id); // devuelve el profesor actualizado
    } 
}