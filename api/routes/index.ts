import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from '../errors/NotFoundError';
import { authJwt, authLocal, withRole, withRoles } from "../middleware/auth";
import cityControlller from '../modules/City/City.controller';
import OfficeControlller from '../modules/Office/Office.controller';
import PropertyController from '../modules/Property/Property.controller';
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from '../modules/User/User.constants';
import UserController from '../modules/User/User.controller';
import * as express from "express";
import * as path from "path";
import { UPLOAD_FOLDER } from '../constants';
import User from '../modules/User/User.entity';
import { appendFile } from 'fs';
import MessageController from '../modules/Message/Message.controller';
import CategoryControlller from '../modules/Category/Category.controller';

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };
    

const authController = new AuthController();
const userController = new UserController();
const officeController = new OfficeControlller();
const propertyController = new PropertyController();
const cityController = new cityControlller()
const messageController = new MessageController();
const categoryController = new CategoryControlller();

const registerOnboardingRoutes = (router: Router) => {
    router.post("/login", authLocal, useMethod(authController.login));
    router.post('/register', useMethod(userController.create))
    // Routes for filter
    router.get('/properties', useMethod(propertyController.all))
    router.get('/cities', useMethod(cityController.all))
    router.get('/categories', useMethod(categoryController.all))
    router.get('/filter/:city', useMethod(propertyController.filter))
    router.get('/', (req, res) => { res.json({"IMMO_DENECKERE": {"status": 'Server online'}})})
    router.get('/properties-rent', useMethod(propertyController.rent))
    router.get('/properties-rent/filter/:city', useMethod(propertyController.rent))
    router.get('/properties-sale', useMethod(propertyController.sale))
};

const registerRealtorRoutes = (router: Router) => {
    const realtorRouter = Router();
    // Office
    realtorRouter.get('/offices', useMethod(officeController.all))
    realtorRouter.get('/office', useMethod(officeController.findCurrent));
    realtorRouter.patch('/office/:id', useMethod(officeController.update));
    // City
    realtorRouter.get('/cities', useMethod(cityController.all))
    // Property
    realtorRouter.get('/properties', useMethod(propertyController.realtorProperties))
    realtorRouter.get('/detail/:id', useMethod(propertyController.find))
    realtorRouter.post('/new-property', useMethod(propertyController.create))
    realtorRouter.patch('/property/:id', useMethod(propertyController.update))
    realtorRouter.delete('/properties/:id', useMethod(propertyController.delete))
    // Messages
    realtorRouter.get('/office-messages', useMethod(messageController.findOfficeMessages))
    // Admin can also access every realtor routes
    router.use('/realtor', withRoles(UserRole.Admin, UserRole.Realtor), realtorRouter);
}

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();

    if (process.env.ENV === "development") {
        // these routes are now protected
        adminRouter.post("/dev/users", useMethod(userController.create));
        adminRouter.get('/allusers', useMethod(userController.all))
        adminRouter.post('/delete/:id', useMethod(userController.delete))
        adminRouter.get('/scrapeCity', useMethod(cityController.scrapeCities))
    }

    //Admin routes
    /* Properties */
    adminRouter.get('/properties', useMethod(propertyController.all))
    adminRouter.patch('/property/:id', useMethod(propertyController.update))
    adminRouter.post('/new-property', useMethod(propertyController.create))
    /* Categories */
    adminRouter.get('/categories', useMethod(categoryController.all))
    adminRouter.post('/new-category', useMethod(categoryController.create))
    adminRouter.delete('/categories/:id', useMethod(categoryController.delete))
    /* Office */
    adminRouter.post('/new-office', useMethod(officeController.create))
    adminRouter.get('/offices', useMethod(officeController.all))
    /* Realtors */
    adminRouter.get('/realtors', useMethod(userController.getRealtors))
    adminRouter.post('/new-realtor', useMethod(userController.create))
    adminRouter.get('/realtor/:id', useMethod(userController.findRealtor))
    adminRouter.patch('/edit-realtor/:id', useMethod(userController.update))
    /* Users */
    adminRouter.get('/users', useMethod(userController.all))
    adminRouter.get('/user/:id', useMethod(userController.findOne))
    adminRouter.patch('/edit-user/:id', useMethod(userController.update))

    router.use('/admin', withRole(UserRole.Admin), adminRouter);
}

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    authRouter.get('/account', useMethod(userController.findCurrent))
    authRouter.post("/account", useMethod(userController.create));
    authRouter.patch("/account", useMethod(userController.update));
    authRouter.get('/property/:id', useMethod(propertyController.find))
    authRouter.get('/favourites', useMethod(userController.findCurrent))
    authRouter.post('/favourites/:propertyId', userController.addToFavourites);
    authRouter.post('/send-message', useMethod( messageController.create))
    authRouter.get('/messages', useMethod(messageController.all))


    registerRealtorRoutes(authRouter);
    registerAdminRoutes(authRouter)
    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    app.use("/public", express.static(path.resolve(__dirname, "../public")));
    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
