import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Property from '../Property/Property.entity';

@Entity()
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column({ nullable: true})
    name: string;

    
    @OneToMany(() => Property, (property) => property.category, {
        cascade: true
    })
    properties: Property[];
}
