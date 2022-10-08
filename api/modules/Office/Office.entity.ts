import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import City from '../City/City.entity';
import Message from '../Message/Message.entity';
import Property from '../Property/Property.entity';
import User from '../User/User.entity';

@Entity()
export default class Office extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contactEmail: string;

    @Column()
    contactName: string;

    @Column({ nullable: true})
    street: string;

    @Column({ nullable: true })
    cityId: number;

    @Column({ nullable: true})
    officeImage?: string;

    @OneToMany(() => Property, (property) => property.office, {
        cascade: true
    })
    properties: Property[];

    @OneToMany(() => User, (user) => user.office)
    users: User[];

    @ManyToOne(() => City, (city) => city.offices)
    city: City

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[];
}
