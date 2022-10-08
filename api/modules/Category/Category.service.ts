import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DataSource";
import Category from "./Category.entity";
import { CategoryBody } from "./Category.types";

export default class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    all = async () => {
        const cities = await this.categoryRepository.find({
            relations: ["properties"],
            order: { id: "ASC"}
        });
        return cities;
    };

    findOne = async (id: number) => {
        const category = await this.categoryRepository.findOneBy({ 
            id
        });
        return category;
    };

    findByName = async (name: string) => {
        const category = await this.categoryRepository.findOne({ 
            where: { name }
        });
        return category;
    };


    create = async (body: CategoryBody) => {
        const category = await this.categoryRepository.save(this.categoryRepository.create(body));
        return category;
    };

    update = async (id: number, body: CategoryBody) => {
        let category = await this.findOne(id);
        if (category) {
            category = await this.categoryRepository.save({ ...category, ...body });
        }
        return category;
    };

    delete = async (id: number) => {
        let category = await this.categoryRepository.findOne({
            where: { id },
            relations: ["properties"]
        });
        if (category) {
            await this.categoryRepository.softRemove(category);
        }
        return category;
    };
}
