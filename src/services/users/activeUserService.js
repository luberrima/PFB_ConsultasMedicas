import { selectUserByRegistrationCodeModel } from '../../models/users/selectUserByRegistrationCodeModel.js';
import { updateActiveUserModel } from '../../models/users/updateActiveUserModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const activeUserService = async (registrationCode) => {

	console.log('registrationCode:', registrationCode);
	const user = await selectUserByRegistrationCodeModel(registrationCode);
	if (!user) {
		throw genereErrorUtils(400, 'USER_NOT_FOUND', 'El usuario no existe');
	}

	if (user.active === 1) {
		throw genereErrorUtils(
			400,
			'USER_ALREADY_ACTIVE',
			'El usuario ya estaba activo. Puedes iniciar sesión'
		);
	}

	const result = await updateActiveUserModel(registrationCode);
	if (result.affectedRows !== 1) {
		throw genereErrorUtils(
			500,
			'ERROR_DB',
			'No se pudo activar el usuario en la base de datos'
		);
	}

	return { ...user, active: 1 };
};
