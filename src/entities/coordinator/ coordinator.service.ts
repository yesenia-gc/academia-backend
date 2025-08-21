import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coordinator } from "./ coordinator.entity";
import { CreateCoordinatorDto } from "./Create- coordinator.dto";



@Injectable()
export class CoordinatorService {
    constructor(
    @InjectRepository(Coordinator)
    private coordinatorRepository: Repository<Coordinator>,
    ){}

    async create(coordinator:CreateCoordinatorDto): Promise<Coordinator>{
        try{
            const existingCoordinator = await this.coordinatorRepository.findOne({
                where: {name: coordinator.name},
            });
            if(existingCoordinator){
                throw new ConflictException('El coordinador ya existe.');
            }
            
            const newCoordinator = this.coordinatorRepository.create(coordinator);
            return await this.coordinatorRepository.save(newCoordinator);

        }catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El estudiante ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el estudiante');
        }
    }

    findAll(): Promise<Coordinator[]> {
    return this.coordinatorRepository.find();
  }
}