import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './entities/rol/rol.module';
import { UsuarioModule } from './entities/usuarios/usuario.module';
import { CursoModule } from './entities/cursos/curso.module';
import { NivelModule } from './entities/niveles/nivel.module';
import { ProfesoresModule } from './entities/Profesores/profesores.module';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1051210227y',
      database: 'academia',
      autoLoadEntities: true,
      synchronize: true, //Sólo usar en producción.
    }),
    RolModule,
    UsuarioModule,
    CursoModule,
    NivelModule,
    ProfesoresModule
  ],
})

export class AppModule{}

