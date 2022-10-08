import { NextFunction, Response } from "express";
import { createToken } from "../../middleware/auth";
import { AuthRequest } from "../../middleware/auth/auth.types";

export default class AuthController {
    login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { user } = req;
        res.json({
            user,
            token: createToken(user),
        });
    };

    /* Register user ans set token with new user data - automatic logged in */
    register = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { newUser } = req;
        res.json({
            newUser,
            token: createToken(newUser),
        });
    }
}
