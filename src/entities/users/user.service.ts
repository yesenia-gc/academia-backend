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
}