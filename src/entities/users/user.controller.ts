import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('create')
    async create(@Body() user: CreateUserDto){
        try{
            const newUser = await this.userService.create(user);
            return{
                success: true,
                message:'Usuario creado exitosamente',
                data: newUser
            };
        } catch (error) {
            return this.handleError(error,'Error al crear usuario.')
        }
    }

    @Get('list')
    findAll(){
        return this.userService.findAll();
    }

    private handleError(error: any, defaultMessage: string){
        return{
            success: false,
            message: error.message || defaultMessage,
            error: error.name || 'Error interno'
        }; 
    }
}