import { voteDoctorSchema } from '../../schemas/consultations/voteDoctorSchema.js';
import { voteDoctorService } from '../../services/consultations/voteDoctorService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const voteDoctorController = async (req, res, next) => {

    try {
      
        const { id } = req.params;
        await validateSchemaUtil(voteDoctorSchema, req.body);
        const { vote } = req.body;
        await voteDoctorService(id, vote);
        res.status(200).send({
            status: 'ok',
            message: 'Valoración registrada correctamente',
        });


    }


    catch (error) {

        next(error);
    }
};