import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:50})
    name: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
}