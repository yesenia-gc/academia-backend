import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(user:CreateUserDto): Promise<User>{
        try{
            const existingUser = await this.userRepository.findOne({
                where:{email: user.email},
            });
            if (existingUser){
                throw new ConflictException(
                    'El usuario ya existe'
                );
            }
            const newUser = this.userRepository.create(user);
            return await this.userRepository.save(newUser);
            
        }catch (error) {
            throw new InternalServerErrorException('Error al crear usuario');
        }
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new ConflictException(`El usuario con id ${id} no existe`);
        }
        return user;
    }

    async update(id: number, userData: CreateUserDto): Promise<User> {
        const user = await this.findOne(id); // primero valida que exista
        await this.userRepository.update(id, userData);
        return this.findOne(id); // devuelve el usuario actualizado
    }
}