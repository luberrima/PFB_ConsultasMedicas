import {getAllSkillsService} from '../../services/skills/getAllSkillService.js'

export const getAllskillsController = async (req, res, next) => {
    try {
        
        const skills = await getAllSkillsService();



        res.send({
            status: 'ok',
            data: {
                skills,
            },
        });
    } catch (error) {
        next(error);
    }
};
