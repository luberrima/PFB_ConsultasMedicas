import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { genereErrorUtils } from '../utils/genereErrorUtils.js';

export const authUserMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw genereErrorUtils(401, ATH, 'No se recibió el token');
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw genereErrorUtils(
                401,
                'ATH',
                'Las creedenciales no son validas'
            );
        }

        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
};
