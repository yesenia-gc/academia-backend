import {ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./ student.entity";
import { CreateStudentDto } from "./Create- student.dto";
import { UpdateStudentDto } from "./update- student.dto";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ){}

    async create(student:CreateStudentDto): Promise<Student>{
        try{
            const existingStudent = await this.studentRepository.findOne({
                where: {name: student.name},
            });
            if(existingStudent){
                throw new ConflictException('El estudiante ya existe.');
            }
            
            const newStudent = this.studentRepository.create(student);
            return await this.studentRepository.save(newStudent);

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('El estudiante ya está registrado');
            }

            throw new InternalServerErrorException('Error al crear el estudiante');
        }
    }

    findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
        throw new ConflictException(`El estudiante con id ${id} no existe`);
    }
    return student;
    }

    async update(id: number, studentData: UpdateStudentDto): Promise<Student> {
        const student = await this.findOne(id); // primero valida que exista
        
        Object.assign(student, studentData);

        return this.studentRepository.save(student); // guarda y devuelve el actualizado
    } 
}