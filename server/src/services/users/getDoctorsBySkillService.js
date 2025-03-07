import { getDoctorsBySkillModel } from '../../models/skills/getDoctorsBySkillModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getDoctorsBySkillService = async (skillId) => {
    if (!skillId) {
        throw genereErrorUtils('El ID de la especialidad es obligatorio', 400);
    }
    return await getDoctorsBySkillModel(skillId);
};