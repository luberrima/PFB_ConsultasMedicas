import { voteDoctorSchema } from '../../schemas/consultation/voteDoctorSchema.js';
import { voteDoctorService } from '../../services/consultation/voteDoctorService.js';
import { validateSchema } from '../../utils/validateSchema.js';

export const voteDoctorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await validateSchema(voteDoctorSchema, req.body);
        const { vote } = req.body;
        await voteDoctorService(id, vote);
        res.status(200).send({
            status: 'ok',
            message: 'Valoración registrada correctamente',
        });
    } catch (error) {
        next(error);
    }
};
