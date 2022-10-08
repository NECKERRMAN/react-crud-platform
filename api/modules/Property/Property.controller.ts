import { NextFunction, Request, RequestHandler, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import CityService from '../City/City.service';
import OfficeService from '../Office/Office.service';
import PropertyService from './Property.service';
import { PropertyBody } from "./Property.types";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from '../../constants';
import { Query } from 'typeorm/driver/Query';
import CategoryService from '../Category/Category.service';
import { CategoryValues } from '../Category/Category.constants';

const getPropertyImage = (req: Request) => {
    if(req.files.propertyImage) {
        const propertyImage: UploadedFile = Array.isArray(req.files.propertyImage)
            ? req.files.propertyImage[0]
            : req.files.propertyImage;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${propertyImage.name}`;
        propertyImage.mv(path);
        return path;
    }
    return `${UPLOAD_FOLDER}/placeholder.jpg`;
}

export default class PropertyController {
    private propertyService: PropertyService;
    private officeService: OfficeService;
    private cityService: CityService;
    private categoryService: CategoryService;

    constructor() {
        this.propertyService = new PropertyService();
        this.officeService = new OfficeService();
        this.cityService = new CityService();
        this.categoryService = new CategoryService();
    }

    /* Fetch all based on price or category filter on same page */
    all = async (req: Request, res: Response, next: NextFunction) => {
        let properties: object;
        /* Check if request has category */
        if(req.query.category && req.query.category !== '--'){
            properties = await this.propertyService.findByCategory(req.query.category)
            /* Else check if request has price */
        } else if(req.query.price && req.query.category !== '--'){
            properties = await this.propertyService.sortPrice(req.query.price)
        } else {
            /* Else fetch all from newest tot oldest */
            properties = await this.propertyService.all();
        }
        return res.json(properties);
    };

    /* Filter properties on city passed by params*/
   filter = async (req: Request<{ city: string}>, res: Response, next: NextFunction) => {
       /* Specific function to find by name */
        const city = await this.cityService.findByName(req.params.city)
        const properties = await this.propertyService.filter(city.id)
        return res.json(properties);
    };

    /* Get properties that are for rent */
    rent = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const properties = await this.propertyService.forRent();
        return res.json(properties);
    };

    /*  Get properties that are for sale */
    sale = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const properties = await this.propertyService.forSale();
        return res.json(properties);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const property = await this.propertyService.findOne(
            parseInt(req.params.id)
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    create = async (
        req: Request<{}, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const propertyImage = getPropertyImage(req);
        
        if (propertyImage) {
            req.body.propertyImage = propertyImage
        };

        if (body.categoryId) {
            body.category = await this.categoryService.findOne(body.categoryId);
        } 

        if (body.cityId) {
            body.city = await this.cityService.findOne(body.cityId);
        } 
        // check if office ID is passed, if so find office
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }
        // create property
        const property = await this.propertyService.create(body);
        return res.json(property);
    };

    update = async (
        req: Request<{ id: string }, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        /* Implemented for error when no image added */
        if(req.files !== null){            
            const propertyImage = getPropertyImage(req);
            if (propertyImage) {
                req.body.propertyImage = propertyImage
            };
        }

        // check if officeID is passed, if so find office
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }
        // update property
        const property = await this.propertyService.update(
            parseInt(req.params.id),
            body
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const property = await this.propertyService.delete(
            parseInt(req.params.id)
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

    /* Find al properties for one users office */
    realtorProperties = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const property = await this.propertyService.realtor( req.user.id );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };
}
