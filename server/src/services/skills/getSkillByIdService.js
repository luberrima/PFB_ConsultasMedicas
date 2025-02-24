import {getSkillByIdModel} from '../../models/skills/selectSkillByIdModel.js';         

export const getSkillByIdService = async (id) => {
    try {
       
        const skillName = await getSkillByIdModel(id);

  
    

    return skillName;


    } catch (error) {
      throw error; 
    }
};
