import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Category from '../Category/Category.entity';
import City from '../City/City.entity';
import Message from '../Message/Message.entity';
import Office from '../Office/Office.entity';
import { PropertyStatus } from './Property.constans';

@Entity()
export default class Property extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adress: string;

    @Column()
    cityId: number;

    @Column()
    price: number;

    @Column()
    rooms: number;

    @Column()
    bathrooms: number;

    @Column()
    bedrooms: number;

    @Column()
    sqrFt: number;

    @Column()
    officeId: number;

    @Column()
    categoryId: number;

    @Column({
        type: "enum",
        enum: PropertyStatus,
        default: PropertyStatus.ForRent,
    })
    status: PropertyStatus;

    @Column()
    buyOrRent: number;

    @Column({ nullable: true})
    propertyImage: string;

    @OneToMany(() => Message, (message) => message.property, {
        cascade: true
    })
    messages: Message[];

    @ManyToOne(() => Office, (office) => office.properties)
    office: Office;

    @ManyToOne(() => City, (city) => city.properties)
    city: City

    @ManyToOne(() => Category, (category) => category.properties)
    category: Category
}
