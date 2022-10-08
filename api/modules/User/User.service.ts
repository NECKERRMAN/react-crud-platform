import User from "./User.entity";
import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import { RequestInfo, RequestInit } from 'node-fetch';
import { UserBody } from './User.types';
import { UserRole } from './User.constants';
import Property from '../Property/Property.entity';

export default class UserService {
    private repository: Repository<User>;
    private propertyRepository: Repository<Property>;

    constructor() {
        const propertyRepository = AppDataSource.getRepository(Property);
        this.repository = AppDataSource.getRepository(User);
        this.propertyRepository = propertyRepository;
    }

    all = async () => {
        const users = await this.repository.find({
            relations: ["office", "favourites"],
            order: { id: "ASC"}
            
        });
        return users;
    };

    /* Find one user by id */
    findOne = async (id: number) => {
        const user = await this.repository.findOne({ 
            where: {id},
            relations: ["office", "favourites"]
        });
        return user;
    }; 

    /* Find current user with all the relations */
    findCurrent = async (id: number) => {
        const user = await this.repository.findOne({ 
            where: { id },
            relations: ["office", "office.properties", "favourites", "favourites.city", "favourites.category"]
         });
        return user;
    };

    /* Find one by options */
    findOneBy = async (options: object) => {
        const user = await this.repository.findOneBy(options);
        return user;
    };
    
    findByEmailWithPassword = async (email: string) => {
        const user = await this.repository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .select("user.password")
            .getOne();
        return user;
    };

    create = async (body) => {
        const user = await this.repository.save(this.repository.create(body));
        return user;
    };

    update = async (id: number, body: UserBody) => {
        let user = await this.findOne(id);
        if (user) {
            user = await this.repository.save({ ...user, ...body });
        }
        return user;
    };

    delete = async (id: number) => {
        let user = await this.repository.findOne({
            where: {id},
            relations: ["messages"]
        });
        if (user) {
            await this.repository.softDelete({ id });
        }
        return user;
    };

    /* Find all users who are realtors */
    findRealtors = async () => {
        const users = await this.repository.find({
            where: { role: UserRole.Realtor },
            relations: ["office"],
            order: { id: "ASC"}
        });
        return users;
    };

    /* Add favourite property, create combined table */
    addFav = async (userId: number, propertyId: number) => {
        let user = await this.findCurrent(userId);

        let property = await this.propertyRepository.findOne({
            where: { id: propertyId },
            relations: ["office", "city", "category"],
        });
        
        if (user) {
            user.favourites.push(property);
            this.repository.save(user)
        }
        return user;
    }
}
