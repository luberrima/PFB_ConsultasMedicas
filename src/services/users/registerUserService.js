import { hashPasswordUtil } from '../../utils/hashPasswordUtil.js';
import { generateUUIDUtil } from '../../utils/generateUUIDUtil.js';
import randomstring from 'randomstring';
import { insertUserModel } from '../../models/users/insertUserModel.js';

export const registerUserService = async (username, email, password) => {
    const id = generateUUIDUtil();
    const passwordHash = await hashPasswordUtil(password);
    const registrationCode = randomstring.generate(15);
    const result = await insertUserModel({ id, username, email, password: passwordHash, role: 'paciente', registrationCode });
    if (result.affectedRows !== 1) {
        throw new Error('No se pudo insertar el usuario');
    }
    return { id, username, email, registrationCode, role: 'paciente' };
};
