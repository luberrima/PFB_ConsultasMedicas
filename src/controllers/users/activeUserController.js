import { activeUserService } from '../../services/users/activeUserService.js';

export const activeUserController = async (req, res, next) => {

	try {
		const { registrationCode } = req.params;

		if (!registrationCode) {
			throw generateErrorUtils(
				400,
				'REGISTRATION_CODE_MISSING',
				'El código de registro es obligatorio'
			);
		}

		const user = await activeUserService(registrationCode);

		res
			.status(200)
			.send({
				status: 'ok',
				message: 'Usuario activado. Inicia sesión',
				data: user,
			});
	} catch (error) {
		next(error);
	}
};
