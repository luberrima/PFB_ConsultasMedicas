import { getConsultationBySkillService } from '../../services/consultations/getConsultationBySkillService.js';

export const getConsultationBySkillController = async (req, res, next) => {
    try {
        const {  skillId } = req.params;
    
        const consultationDetail = await getConsultationBySkillService( skillId);

        res.status(200).send({
            status: 'ok',
            data: consultationDetail,
        });
    } catch (error) {
        next(error);
    }
};