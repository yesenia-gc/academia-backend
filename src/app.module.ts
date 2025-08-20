import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './entities/rol/role.module';
import { UserModule } from './entities/usuarios/user.module';
import { CourseModule } from './entities/cursos/ course.module';
import { LevelModule } from './entities/niveles/ level.module';
import { TeachersModule } from './entities/Profesores/teacher.module';
import { SubjectModule } from './entities/materias/ subject.module';

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
    RoleModule,
    UserModule,
    CourseModule,
    LevelModule,
    TeachersModule,
    SubjectModule
  ],
})

export class AppModule{}

