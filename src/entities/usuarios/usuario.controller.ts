import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./create-usuario.dto";

@Controller('users')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Post('create')
    async create(@Body() usuario: CreateUsuarioDto){
        try{
            const newUsuario = await this.usuarioService.create(usuario);
            return{
                success: true,
                message:'Usuario creado exitosamente',
                data: newUsuario
            };
        } catch (error) {
            return this.handleError(error,'Error al crear usuario.')
        }
    }

    @Get('list')
    findAll(){
        return this.usuarioService.findAll();
    }

    private handleError(error: any, defaultMessage: string){
        return{
            success: false,
            message: error.message || defaultMessage,
            error: error.name || 'Error interno'
        }; 
    }
}