import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from '../../middleware/auth/auth.types';
import CityService from './City.service';
import { CityBody } from "./City.types";

export default class cityControlller {
    private cityService: CityService;

    constructor() {
        this.cityService = new CityService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const citys = await this.cityService.all();
        return res.json(citys);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const city = await this.cityService.findOne(
            parseInt(req.params.id)
        );
        if (!city) {
            next(new NotFoundError());
            return;
        }
        return res.json(city);
    };

    create = async (
        req: AuthRequest<{}, {}, CityBody>,
        res: Response,
        next: NextFunction
    ) => {
        const city = await this.cityService.create(req.body);
        return res.json(city);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, CityBody>,
        res: Response,
        next: NextFunction
    ) => {
        const city = await this.cityService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!city) {
            next(new NotFoundError());
            return;
        }
        return res.json(city);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const city = await this.cityService.delete(parseInt(req.params.id));
        if (!city) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

    scrapeCities = async (req: AuthRequest <{}, {}, CityBody>, res: Response, next: NextFunction) => {
        const cities = await this.cityService.scrapeCity();
        return res.json(cities);
    };
}
