import { IsDefined } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Office from '../Office/Office.entity';
import Property from '../Property/Property.entity';
import User from "../User/User.entity";

@Entity()
export default class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    content: string;

    @Column()
    isRead: boolean;

    @ManyToOne(() => Property, (property) => property.messages)
    property: Property;

    @ManyToOne(() => Office, (office) => office.messages)
    office: Office;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;
}