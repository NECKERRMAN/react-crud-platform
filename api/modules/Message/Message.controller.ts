import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import OfficeService from '../Office/Office.service';
import PropertyService from '../Property/Property.service';
import UserService from "../User/User.service";
import MessageService from './Message.service';
import { MessageBody } from './Message.types';

export default class MessageController {
    private messageService: MessageService;
    private userService: UserService;
    private propertyService: PropertyService;
    private officeService: OfficeService;


    constructor() {
        this.messageService = new MessageService();
        this.userService = new UserService();
        this.propertyService = new PropertyService();
        this.officeService = new OfficeService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const messages = req.user.isAdmin()
            ? await this.messageService.all()
            : await this.messageService.allForUser(req.user.id);
        return res.json(messages);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const message = req.user.isAdmin()
            ? await this.messageService.findOne(parseInt(req.params.id))
            : await this.messageService.findOneForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    /* Find al messages for current user's office */
    findOfficeMessages = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        // Find current user
        const user = await this.userService.findCurrent( req.user.id);
        // If user has no office return
        if(user.office.id === null){
            next(new NotFoundError());
            return;
        }
        // Get messages for correct office from user officeId
        const messages = await this.messageService.allForOffice(user.office.id);

        if (!messages) {
            next(new NotFoundError());
            return;
        }

        return res.json(messages);
    };

    create = async (
        req: AuthRequest<{}, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.propertyId) {
            body.property = await this.propertyService.findOne(body.propertyId);
        }

        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }

        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }

        const message = await this.messageService.create(body);
        return res.json(message);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.propertyId) {
            body.property = await this.propertyService.findOne(body.propertyId);

        }
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }
        // update message
        const message = req.user.isAdmin()
            ? await this.messageService.update(parseInt(req.params.id), body)
            : await this.messageService.updateForUser(
                  parseInt(req.params.id),
                  body,
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const message = req.user.isAdmin()
            ? await this.messageService.delete(parseInt(req.params.id))
            : await this.messageService.deleteForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}