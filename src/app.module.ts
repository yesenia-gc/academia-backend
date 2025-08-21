import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './entities/roles/role.module';
import { UserModule } from './entities/users/user.module';
import { CourseModule } from './entities/courses/ course.module';
import { LevelModule } from './entities/levels/ level.module';
import { TeachersModule } from './entities/teachers/teacher.module';
import { SubjectModule } from './entities/subjects/ subject.module';
import { AttendantModule } from './entities/attendant/ attendant.module';
import { CoordinatorModule } from './entities/coordinator/ coordinator.module';
import { StudentModule } from './entities/student/ student.module';

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
    SubjectModule,
    AttendantModule,
    CoordinatorModule,
    StudentModule
  ],
})

export class AppModule{}

