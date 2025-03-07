import { getDoctorsBySkillService } from '../../services/users/getDoctorsBySkillService.js';

export const getDoctorsBySkillController = async (req, res, next) => {
    try {
        const { skillId } = req.params;
        const doctors = await getDoctorsBySkillService(skillId);

        res.status(200).json({ status: 'success', data: doctors });
    } catch (error) {
        next(error);
    }
};
