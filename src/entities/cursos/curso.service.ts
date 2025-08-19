import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Curso } from "./curso.entity";
import { CreateCursoDto } from "./create-curso.dto";
import { Rol } from "../rol/rol.entity";


@Injectable()
export class CursoService {
    constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
    ){}

    async create(curso:CreateCursoDto): Promise<Curso>{
        try{
            const existingCurso = await this.cursoRepository.findOne({
                where: {name: curso.name},
            });
            if(existingCurso){
                throw new ConflictException('El curso ya existe.');
            }
            
            const newCurso = this.cursoRepository.create(curso);
            return await this.cursoRepository.save(newCurso);

        }catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El curso ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el curso');
        }
    }

    findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }
}