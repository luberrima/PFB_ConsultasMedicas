import jwt from 'jsonwebtoken';
import { genereErrorUtils } from '../utils/genereErrorUtils.js';
import 'dotenv/config';
import { SECRET } from '../../env.js';

export const authUserMiddleware = async (req, res, next) => {
    try {

        let { authorization } = req.headers;
       
       

        if (!authorization) {
            throw genereErrorUtils(401, 'NO_TOKEN', 'No se recibió el token');
        }

        let tokenInfo;
       
        try {
            
            tokenInfo = jwt.verify(authorization, SECRET);
        } catch (error) {
            

            throw genereErrorUtils(
                401,
                'CREDENCIALES_INVALIDAS',
                'Las creedenciales no son validas'
            );
        }
         
        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
};
