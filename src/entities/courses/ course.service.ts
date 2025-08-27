import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "./ course.entity";
import { CreateCourseDto } from "./Create- course.dto";
import { UpdateCourseDto } from "./update- course.dto";

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course)
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

    async findOne(id: number): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            throw new ConflictException(`El curso con id ${id} no existe`);
        }
        return course;
    }

    async update(id: number, courseData: UpdateCourseDto): Promise<Course> {
        const course = await this.findOne(id); // primero valida que exista
        Object.assign(course, courseData);
        return this.courseRepository.save(course); // devuelve el curso actualizado
    } 
}