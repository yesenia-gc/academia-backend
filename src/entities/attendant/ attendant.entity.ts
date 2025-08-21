import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('attendant')
export class Attendant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:50})
    name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
}