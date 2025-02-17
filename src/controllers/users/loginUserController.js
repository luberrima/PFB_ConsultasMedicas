import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
import { loginUserService } from '../../services/users/loginUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Validar si hay datos
        await validateSchemaUtil(loginUserSchema, req.body);

        //Llamar al service de login. devuelve el token
        const token = await loginUserService(email, password);

        res.status(200).send({
            status: 'ok',
            message: 'User logged',
            data: token,
        });
    } catch (error) {
        next(error);
    }
};
