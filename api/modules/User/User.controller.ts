import { NextFunction, Request, Response } from "express";
import ForbiddenError from '../../errors/ForbiddenError';
import NotFoundError from "../../errors/NotFoundError";
import { authJwt, createToken, withRole } from '../../middleware/auth';
import { AuthRequest } from "../../middleware/auth/auth.types";
import JwtStrategy from '../../middleware/auth/JwtStrategy';
import OfficeService from '../Office/Office.service';
import { UserRole } from './User.constants';
import UserService from "./User.service";
import { UserBody } from './User.types';

export default class UserController {
    private userService: UserService;
    private officeService : OfficeService;

    constructor() {
        this.userService = new UserService();
        this.officeService = new OfficeService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const users = await this.userService.all();
        return res.json(users);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneBy({ 
            id: req.params.id
        });
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json(user);
    };

    findOne = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOne(parseInt(req.params.id));
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json(user);
    };

    /* Find the correct realtor */
    findRealtor = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findCurrent(parseInt(req.params.id));
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json(user);
    };

    /* Find current logged in user */
    findCurrent = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findCurrent( req.user.id );
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json(user);
    };
    
    create = async (
        req: AuthRequest<{}, {}, UserBody>, 
        res: Response, 
        next: NextFunction
    ) => {

        const { body } = req;
        /* Check if user passed new role and if user is Admin */
        if(body.role === UserRole.Admin || body.role === UserRole.Realtor){
            if(!req.user.isAdmin()){
                next(new ForbiddenError());
                return;
            }
        }
        /*  Check othet body params */
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }

        /* Register user ans set token with new user data - automatic logged in */
        const user = await this.userService.create(req.body);
        const data = await this.userService.findOne(user['id'])
        return res.json({
            user,
            token: createToken(data)
        }); 
    };

    update = async (
        req: AuthRequest<{}, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        /* Check if user has permission to change roles */
        if(body.role === UserRole.Admin || body.role === UserRole.Realtor){
            if(!req.user.isAdmin()){
                next(new ForbiddenError());
                return;
            }
        }
        
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }

        const user = await this.userService.update(
            req.user.id,
            req.body
        );
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json(user);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.delete(parseInt(req.params.id));
        if (!user) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

    /* Get all users who are realtors */
    getRealtors = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const users = await this.userService.findRealtors();
        return res.json(users);
    };

    /* User can add properties to his favourites */
    addToFavourites = async (req: AuthRequest<{propertyId: string }>, res: Response, next: NextFunction) => {
        const user = await this.userService.addFav( req.user.id, parseInt(req.params.propertyId));
        return res.json(user);
    };
}
