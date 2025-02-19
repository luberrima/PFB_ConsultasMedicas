import {selectAllskillModel} from '../../models/skills/selectAllSkillsModel.js';         

export const getAllSkillsService = async () => {
    try {
       
        const skill = await selectAllskillModel();
     

    return skill;


    } catch (error) {
      throw error; 
    }
};
