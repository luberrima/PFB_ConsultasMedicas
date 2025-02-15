import { hashPasswordUtil } from '../../utils/hashPasswordUtil.js';
import { generateUUIDUtil } from '../../utils/generateUUIDUtil.js';
import randomstring from 'randomstring';
import { insertUserModel } from '../../models/users/insertUserModel.js';
import { insertDoctorModel } from '../../models/users/insertDoctorModel.js';

export const registerDoctorService = async (username, email, password, collegeNumber, dateOfCollege, skillId) => {
    const userId = generateUUIDUtil();
    const doctorId = generateUUIDUtil();
    const passwordHash = await hashPasswordUtil(password);
    const registrationCode = randomstring.generate(15);

    const userResult = await insertUserModel({ id: userId, username, email, password: passwordHash, role: 'doctor', registrationCode });
    if (userResult.affectedRows !== 1) {
        throw new Error('No se pudo insertar el usuario doctor');
    }

    const doctorResult = await insertDoctorModel({ id: doctorId, userId, collegeNumber, dateOfCollege, skillId });
    if (doctorResult.affectedRows !== 1) {
        throw new Error('No se pudo insertar el doctor');
    }

    return { id: userId, username, email, registrationCode, role: 'doctor' };
};