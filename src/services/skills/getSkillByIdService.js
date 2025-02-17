import {getSkillByIdModel} from '../../models/skills/selectSkillByIdModel.js';         

export const getSkillByIdService = async (id) => {
    try {
       
        const skillName = await getSkillByIdModel(id);

        console.log(skillName);
    

    return skillName;


    } catch (error) {
      throw error; 
    }
};
