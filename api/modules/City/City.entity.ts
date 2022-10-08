import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Office from '../Office/Office.entity';
import Property from '../Property/Property.entity';

@Entity()
export default class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    zipcode: string;
    
    @OneToMany(() => Property, (property) => property.city)
    properties: Property[];
    
    // One city can have multiple offices
    @OneToMany(() => Office, (office) => office.city)
    offices: Office[];
}
