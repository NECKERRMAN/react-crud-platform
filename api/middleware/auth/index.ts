import * as passport from "passport";
import AuthError from "../../errors/AuthError";
import LocalStrategy from "./LocalStrategy";
import ForbiddenError from "../../errors/ForbiddenError";
import * as jwt from "jsonwebtoken";
import User from "../../modules/User/User.entity";
import { UserRole } from "../../modules/User/User.constants";
import { NextFunction, Response } from "express";
import JwtStrategy from "./JwtStrategy";

passport.use("local", LocalStrategy);
passport.use("jwt", JwtStrategy);

const passportWithErrorHandling = (strategy) => {
    return function (req, res: Response, next: NextFunction) {
        passport.authenticate(
            strategy,
            { session: false },
            function (err: any, user: User) {
                if (!user) {
                    return next(new AuthError());
                } 
                if (err) {
                    return next(err);
                } else {
                    req.user = user;
                    return next();
                }
            }
        )(req, res, next);
    };
};

const authLocal = passportWithErrorHandling("local");
const authJwt = passportWithErrorHandling("jwt");

const createToken = (user: User) => {
    return jwt.sign({ id: user.id, user: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN_HOURS) * 60 * 60,
    });
};

const withRole = (role: UserRole) => (req, res, next) => {
    const { user } = req;
    if (user.role === role) {
        next();
    } else {
        next(new ForbiddenError());
    }
};

const withRoles = (role: UserRole, role2: UserRole) => (req, res, next) => {
    const { user } = req;
    if (user.role === role || user.role === role2) {
        next();
    } else {
        next(new ForbiddenError());
    }
};

export { authLocal, authJwt, withRole, withRoles, createToken };
