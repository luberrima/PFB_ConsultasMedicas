import { takeEmpyConsultationdModel } from '../../models/consultations/takeEmpyConsultationdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';
import { getConsultationByIdModel } from '../../models/consultations/getConsultationByIdModel.js';


export const takeEmpyConsultationService = async (id,consultationId) => {

     const user = await selectUserDoctorByIdModel(id);
     
     
    
        if (!user) {
            throw genereErrorUtils(
                401,
                'USERDOCTOR_NOT_FOUND',
                'Doctor no encontrado o inactivo/No validado'
            );
        }
        if (user.role !== 'doctor') {
            throw genereErrorUtils(
                401,
                'INVALID_ROLE_USER',
                'Esta seccion es solo para doctores'
            );
        }
        const consultation = await getConsultationByIdModel(consultationId);
        if (!consultation) {
            throw genereErrorUtils(
                401,
                'CONSULTATION_NOT_FOUND',
                'Consulta no encontrada'
            );
        }

        if(user.skillId!==consultation.skillId)
        {
            throw genereErrorUtils(
                401,
                'SKILL_REQUIERED',
                'No tiene la especialidad requerida para tomar esta consulta'
            );
        }

        if(consultation.doctorId)
            {
                throw genereErrorUtils(
                    401,
                    'CONSULTATION_IS_TAKEN',
                    'Esta consulta ya esta pillada'
                );
            }




    
    const result = await takeEmpyConsultationdModel(id,consultationId);

    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'ENTRY_NOT_UPDATED',
            'No se ha podido editar el diganostico'
        );
    }
    

    
    return "Se ha actualizado la consulta";
};