import * as puppeteer from 'puppeteer';

import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Property from "./Property.entity";
import { PropertyBody } from "./Property.types";
import User from '../User/User.entity';
import Office from '../Office/Office.entity';
import QueryString = require('qs');

export default class PropertyService {
    private propertyRepository: Repository<Property>;
    private userRepository: Repository<User>;
    private officeRepository: Repository<Office>;

    constructor() {
        this.propertyRepository = AppDataSource.getRepository(Property);
        this.userRepository = AppDataSource.getRepository(User);
        this.officeRepository = AppDataSource.getRepository(Office);
    }

    /* Get all properties from newest to oldest */
    all = async () => {
        const properties = await this.propertyRepository.find({
            relations: ["office", "city", "category"],
            order: { createdAt: "DESC"}
        });
        return properties;
    };

    /* Sort on price */
    sortPrice = async (sort : any) => {
        const properties = await this.propertyRepository.find({
            relations: ["office", "city", "category"],
            order: { price: sort}
        });
        return properties;
    };

    /* Filter on category name */
    findByCategory = async ( category : any ) => {
        const properties = await this.propertyRepository.find({
            where: {
                category: {
                    name: category
                }
            },
            relations: ["office", "city", "category"]
        })
        return properties;
    }

    /* Sort on rent */
    forRent = async () => {
        const properties = await this.propertyRepository.find({
            where: { buyOrRent: 0},
            relations: ["office", "city", "category"],
        });
        return properties;
    };

    /* Sort on sale */
    forSale = async () => {
        const properties = await this.propertyRepository.find({
            where: { buyOrRent: 1},
            relations: ["office", "city", "category"],
        });
        return properties;
    };

    /* Get properties for realtors office */
    realtor = async ( id: number ) => {
        const realtor = await this.userRepository.findOne({ 
            where: { id },
            relations: ["office"]
        });
        const office = await this.officeRepository.findOne({
            where: { id: realtor.office.id},
            relations: ["properties", "properties.city", "properties.office"]
        });
        return office.properties;
    };

    /* Find one property */
    findOne = async (id: number) => {
        const property = await this.propertyRepository.findOne({
            where: { id },
            relations: ["office", "city", "messages", "category"],
        });
        return property;
    };

    create = async (body: PropertyBody) => {
        const property = await this.propertyRepository.save(
            this.propertyRepository.create(body)
        );
        return property;
    };

    update = async (id: number, body: PropertyBody) => {
        let property = await this.findOne(id);
        if (property) {
            property = await this.propertyRepository.save({
                ...property,
                ...body,
            });
        }
        return property;
    };

    delete = async (id: number) => {
        let property = await this.propertyRepository.findOne({
            where: { id },
            relations: ["messages"]

        });
        if (property) {
            await this.propertyRepository.softRemove(property);
        }
        return property;
    };
    
    /* Filter on city id */
    filter = async( id: number ) => {
        const properties = await this.propertyRepository.find({
            relations: ["office", "city", "category"],
            where: { 
                cityId: id
            },
        });
        return properties;
    }
}
