import { newUserSchema } from '../../schemas/users/newUserSchema.js';
import { registerUserService } from '../../services/users/registerUserService.js';

export const registerUserController = async (req, res, next) => {
    try {
        await newUserSchema.validateAsync(req.body);
        const { username, email, password } = req.body;
        const user = await registerUserService(username, email, password);
        res.status(201).send({
            status: 'ok',
            message: 'Usuario registrado correctamente',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};