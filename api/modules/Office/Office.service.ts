import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import Office from "./Office.entity";
import { OfficeBody } from "./Office.types";

export default class OfficeService {
    private officeRepository: Repository<Office>;

    constructor() {
        this.officeRepository = AppDataSource.getRepository(Office);
    }

    all = async () => {
        const offices = await this.officeRepository.find({
            relations: ["properties", "users", "city"],
            order: { id: "ASC"}
        });
        return offices;
    };

    findOne = async (id: number) => {
        const office = await this.officeRepository.findOne({ 
            where: { id },
            relations: ["city", "users", "properties"]
        });
        return office;
    };

    create = async (body: OfficeBody) => {
        const office = await this.officeRepository.save(this.officeRepository.create(body));
        return office;
    };

    update = async (id: number, body: OfficeBody) => {
        let office = await this.findOne(id);
        if (office) {
            office = await this.officeRepository.save({ ...office, ...body });
        }
        return office;
    };

    delete = async (id: number) => {
        let office = await this.officeRepository.findOne({
            where: { id },
            relations: ["properties", "realtors"]
        });
        if (office) {
            await this.officeRepository.softRemove(office);
        }
        return office;
    };
}
