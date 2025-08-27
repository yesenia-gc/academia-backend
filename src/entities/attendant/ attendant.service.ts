import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendant } from "./ attendant.entity";
import { CreateAttendantDto } from "./Create- attendant.dto";
import { UpdateAttendantDto } from "./update- attendant.dto";

@Injectable()
export class AttendantService {
    constructor(
        @InjectRepository(Attendant)
        private attendantRepository: Repository<Attendant>,
    ) {}

    async create(attendant: CreateAttendantDto): Promise<Attendant> {
        try{
            const existingAttendant = await this.attendantRepository.findOne({
                where: {name: Attendant.name},
            });
            if(existingAttendant){
                throw new ConflictException('El acudiente ya existe.');
            }
            
            const newAttendant = this.attendantRepository.create(attendant);
            return await this.attendantRepository.save(newAttendant);

        } catch (error) {
             console.error(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('El acudiente ya está registrado');
            }
            throw new InternalServerErrorException('Error al crear el acudiente');
        }
    }

    findAll(): Promise<Attendant[]> {
    return this.attendantRepository.find();
  }

  async findOne(id: number): Promise<Attendant> {
    const attendant = await this.attendantRepository.findOneBy({ id });
    if (!attendant) {
        throw new ConflictException(`El acudiente con id ${id} no existe`);
    }
    return attendant;
    }

    async update(id: number, attendantData: UpdateAttendantDto): Promise<Attendant> {
    const attendant = await this.findOne(id); // primero valida que exista
    Object.assign(attendant, attendantData);
    
    return this.attendantRepository.save(attendant); // devuelve el acudiente actualizado
    } 
}