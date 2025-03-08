import { genereErrorUtils } from '../utils/genereErrorUtils.js';

export const canDoItMiddleware = async (req, res, next) => {
    // Tareas:
    // 1. Comprobar si el usuario puede editar una entrada
    console.log('LO QUE VIENE DEL REQ:', req);
    try {
        // Datos del usuario autenticado
        const { id: idUserLogged, role: roleUserLogged } = req.user;

        // ID del doctor propietario de la entrada
        const { doctorId } = req.consult || {};
        const { userId } = req.consult || {};
        console.log('QUE TENGO DE USER req', req);
        console.log('QUE TENGO DE USER req.user', req.user);
        console.log('QUE TENGO DE USER req.consut', req.consult);
        console.log('QUE TENGO DE CandoItMidelware idUserLogged', idUserLogged);
        console.log('QUE TENGO DE CandoItMidelware userId', userId);
        console.log(
            'QUE TENGO DE CandoItMidelware roleUserLogged',
            roleUserLogged
        );

        //

        if (
            req.method === 'POST' &&
            req.body.value >= 1 &&
            req.body.value <= 5 &&
            idUserLogged === doctorId
        ) {
            throw genereErrorUtils(
                403,
                'FORBIDDEN',
                'No puedes votar tu propia consulta'
            );
        } else if (req.method === 'DELETE') {
            // Permitir si el usuario es el dueño o es admin
            if (idUserLogged !== userId && roleUserLogged !== 'admin') {
                throw genereErrorUtils(
                    403,
                    'FORBIDDEN',
                    'No tienes permisos para eliminar esta entrada'
                );
            }
        } else {
            // Para cualquier otro método, permitir solo si es el dueño
            if (idUserLogged !== doctorId) {
                throw genereErrorUtils(
                    403,
                    'FORBIDDEN',
                    'No tienes permisos para realizar esta acción'
                );
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};
