import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Usuario } from "./usuarios.entity";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ){}

    async create(usuario:CreateUsuarioDto): Promise<Usuario>{
        try{
            const existingUsuario = await this.usuarioRepository.findOne({
                where:{email: usuario.email},
            });
            if (existingUsuario){
                throw new ConflictException(
                    'El usuario ya existe'
                );
            }
            const newUsuario = this.usuarioRepository.create(usuario);
            return await this.usuarioRepository.save(newUsuario);
            
        }catch (error) {
            throw new InternalServerErrorException('Error al crear usuario');
        }
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }
}