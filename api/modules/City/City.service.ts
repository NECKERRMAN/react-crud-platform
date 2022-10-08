import * as puppeteer from 'puppeteer';
import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import City from "./City.entity";
import { CityBody } from "./City.types";

export default class CityService {
    private cityRepository: Repository<City>;

    constructor() {
        this.cityRepository = AppDataSource.getRepository(City);
    }

    all = async () => {
        const cities = await this.cityRepository.find({
            relations: ["properties"],
        });
        return cities;
    };

    findOne = async (id: number) => {
        const city = await this.cityRepository.findOneBy({ 
            id
        });
        return city;
    };

    findByName = async (name: string) => {
        const city = await this.cityRepository.findOne({ 
            where: { name }
        });
        return city;
    };


    create = async (body: CityBody) => {
        const city = await this.cityRepository.save(this.cityRepository.create(body));
        return city;
    };

    update = async (id: number, body: CityBody) => {
        let city = await this.findOne(id);
        if (city) {
            city = await this.cityRepository.save({ ...city, ...body });
        }
        return city;
    };

    delete = async (id: number) => {
        let city = await this.findOne(id);
        if (city) {
            await this.cityRepository.softDelete({ id });
        }
        return city;
    };

    scrapeCity = async () => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage()
        const timeout = 30000;
        page.setDefaultTimeout(timeout);

        await page.goto(process.env.SCRAPE_CITIES)
        for(let i=429; i < 607; i++){
            const textSelector = await page.waitForSelector(".ss-list .ss-option:nth-child(" + i + ")")
            if(!textSelector) return;
            const cityText = await page.evaluate(textSelector => textSelector.textContent, textSelector)
            //const cityZip = await page.evaluate(selector => selector.textContent, selector)
            let cityBody = {
                name: cityText.slice(5),
                zipcode: cityText.substring(0, 4)
            }
            this.create(cityBody)
        }
        browser.close()
    }
}
