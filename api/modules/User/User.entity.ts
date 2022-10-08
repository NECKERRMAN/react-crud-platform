import { compare, hash } from "bcrypt";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Message from '../Message/Message.entity';
import Office from '../Office/Office.entity';
import Property from '../Property/Property.entity';
import { UserRole } from "./User.constants";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @ManyToOne(() => Office, (office) => office.users)
    office: Office;

    /* MANY TO MANY - User Favourites */
    @ManyToMany(() => Property)
    @JoinTable()
    favourites: Property[];

    @OneToMany(() => Message, (message) => message.user,{
        cascade: true
    })
    messages: Message[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    async checkPassword(passwordToCheck: string) {
        return await compare(passwordToCheck, this.password);
    }

    isAdmin() {
        return this.role === UserRole.Admin;
    }

    isRealtor(){
        return this.role === UserRole.Realtor;
    }


}
