import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { selectUserByEmailModel } from '../../models/users/selectUserbyEmailModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const loginUserService = async (email, password) => {
    //BUscar el usuario por el email
    const user = await selectUserByEmailModel(email);

    //Contraseña correcta
    let passwordValid = false;

    if (user) {
        passwordValid = await bcrypt.compare(password, user.password);
    }

    //generar error
    if (!user || !passwordValid) {
        throw genereErrorUtils(
            401,
            'LOGIN_FAILED',
            'Email o contraseña incorrectos'
        );
    }

    //comprobar user
    if (!user.active) {
        throw genereErrorUtils(401, 'LOGIN_FAILED', 'Usuario no activo');
    }

    //token
    const payload = {
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '24h',
    });

    return token;
};
