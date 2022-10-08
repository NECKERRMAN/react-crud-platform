import { NextFunction, Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';
import { UPLOAD_FOLDER } from '../../constants';
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from '../../middleware/auth/auth.types';
import CityService from '../City/City.service';
import UserService from '../User/User.service';
import OfficeService from "./Office.service";
import { OfficeBody } from "./Office.types";

/* Function to get office image */
const getOfficeImage = (req: Request) => {
    if(req.files.officeImage) {
        const officeImage: UploadedFile = Array.isArray(req.files.officeImage)
            ? req.files.officeImage[0]
            : req.files.officeImage;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${officeImage.name}`;
        officeImage.mv(path);
        return path;
    }
    // If no file(s) return office placeholder image
    return `${UPLOAD_FOLDER}/office-placeholder.jpg`;
}

export default class OfficeControlller {
    private officeService: OfficeService;
    private cityService: CityService;
    private userService: UserService;

    constructor() {
        this.officeService = new OfficeService();
        this.cityService = new CityService();
        this.userService = new UserService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const offices = await this.officeService.all();
        return res.json(offices);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.officeService.findOne(
            parseInt(req.params.id)
        );
        
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    /* Find the current logged in users office */
    findCurrent = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findCurrent( req.user.id )
        
        if( user.office !== null ){
            const office = await this.officeService.findOne(user.office.id)
            if (!office) {
                next(new NotFoundError());
                return;
            }
            return res.json(office);
        } else {
            next(new NotFoundError());
            return;
        }
    };

    create = async (
        req: Request<{}, {}, OfficeBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const officeImage = getOfficeImage(req);
        
        if (officeImage) {
            req.body.officeImage = officeImage
        };

        if (body.cityId) {
            body.city = await this.cityService.findOne(body.cityId);
        } 

        const office = await this.officeService.create(req.body);
        return res.json(office);
    };

    update = async (
        req: Request<{ id: string }, {}, OfficeBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if(req.files === null){
            req.body.officeImage = body.officeImage;
        } else {
            const officeImage = getOfficeImage(req);

            if (officeImage) {
                req.body.officeImage = officeImage
            }
        }
        
        const office = await this.officeService.update(
            parseInt(req.params.id),
            req.body
        );

        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.officeService.delete(parseInt(req.params.id));
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
