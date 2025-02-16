import { newDoctorSchema } from '../../schemas/users/newDoctorSchema.js';
import { registerDoctorService } from '../../services/users/registerDoctorService.js';

export const registerDoctorController = async (req, res, next) => {
    try {
        await newDoctorSchema.validateAsync(req.body);
        const { username, email, password, collegeNumber, dateOfCollege, skillId } = req.body;
        const doctor = await registerDoctorService(username, email, password, collegeNumber, dateOfCollege, skillId);
        res.status(201).send({
            status: 'ok',
            message: 'Doctor registrado correctamente',
            data: doctor,
        });
    } catch (error) {
        next(error);
    }
};