import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "./ course.entity";
import { CreateCourseDto } from "./Create- course.dto";



@Injectable()
export class 
CourseService {
    constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    ){}

    async create(course:CreateCourseDto): Promise<Course>{
        try{
            const existingCourse = await this.courseRepository.findOne({
                where: {name: course.name},
            });
            if(existingCourse){
                throw new ConflictException('El curso ya existe.');
            }
            
            const newCourse = this.courseRepository.create(course);
            return await this.courseRepository.save(newCourse);

        }catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El curso ya está registrado');
      }

      throw new InternalServerErrorException('Error al crear el curso');
        }
    }

    findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }
}