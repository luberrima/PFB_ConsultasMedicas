import { loginUserService } from '../../services/users/loginUserService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js'



export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

         //Validar si hay datos
        if (!email || !password) {
            throw genereErrorUtils(
                400,
                'DATA_MISSING',
                'El e-mail y la contraseña son obligatorios'
            );
        }

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
