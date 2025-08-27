import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './ subject.entity';
import { CreateSubjectDto } from './create- subject.dto';
import { UpdateSubjectDto } from './update- subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(subject: CreateSubjectDto): Promise<Subject> {
    try {
      const existingSubject = await this.subjectRepository.findOne({
        where: { name: subject.name },
      });

      if (existingSubject) {
        throw new ConflictException(
          `La materia ${subject.name} ya está en uso`,
        );
      }

      const newSubject = this.subjectRepository.create(subject);
      return await this.subjectRepository.save(newSubject);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('La materia ya está registrada');
      }
      throw new InternalServerErrorException('Error al crear la materia');
    }
  }

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new ConflictException(`La materia con id ${id} no existe`);
    }
    return subject;
  }

  async update(id: number, subjectData: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id); // valida que exista
    Object.assign(subject, subjectData);
    return this.subjectRepository.save(subject); // devuelve la materia actualizada
  }
}
