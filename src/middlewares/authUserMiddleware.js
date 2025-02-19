import jwt from 'jsonwebtoken';
import { genereErrorUtils } from '../utils/genereErrorUtils.js';
import 'dotenv/config';

export const authUserMiddleware = (req, res, next) => {
    try {

        const { authorization } = req.headers;

        if (!authorization) {
            throw genereErrorUtils('No se recibió el token', 401);
        }

        let tokenInfo;

        try {

            tokenInfo = jwt.verify(authorization, process.env.SECRET);

        } catch (error) {
            throw genereErrorUtils('Las creedenciales no son validas', 401);
        }
        
        req.user = tokenInfo;

        next();

    } catch (error) {
        next(error);
    }
}

