import bcrypt from 'bcrypt';
import crypto from 'crypto';
import randomstring from 'randomstring';
import { insertUserModel } from '../../models/users/insertUserModel.js';
import { insertDoctorModel } from '../../models/users/insertDoctorModel.js';

export const registerUserService = async (username, email, password, role, skillId, collegeNumber, dateOfCollege) => {
    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);
    const registrationCode = randomstring.generate(15);
    const result = await insertUserModel({ id, username, email, password: passwordHash, role, registrationCode });

    if (result.affectedRows !== 1) {
        throw new Error('No se pudo insertar el usuario');
    }

    if (role === 'doctor') {
        const doctorResult = await insertDoctorModel({ id: crypto.randomUUID(), userId: id, skillId, collegeNumber, dateOfCollege });
        if (doctorResult.affectedRows !== 1) {
            throw new Error('No se pudo insertar el doctor');
        }
    }

    return { id, username, email, role, registrationCode };
};