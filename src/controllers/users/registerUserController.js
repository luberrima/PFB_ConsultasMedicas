import { newUserSchema } from '../../schemas/users/newUserSchema.js';
import { registerUserService } from '../../services/users/registerUserService.js';
import { validateSchema } from '../../utils/validateSchema.js';

export const registerUserController = async (req, res, next) => {
    try {
        await validateSchema(newUserSchema, req.body);
        const { username, email, password, role, skillId, collegeNumber, dateOfCollege } = req.body;
        const user = await registerUserService(username, email, password, role, skillId, collegeNumber, dateOfCollege);
        res.status(201).send({
            status: 'ok',
            message: 'Usuario registrado correctamente',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};