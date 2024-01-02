import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next)=> {
    const token = req.cookies && req.cookies.access_token;
    
    if(!token) {
        return next(errorHandler(401, 'Unauthorized'));
    } 
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err) return next(errorHandler(403, 'Forbidden'));
        
        req.user = user;
        next(); //next goes to updateUser... refer to user.routes.js

    });
};