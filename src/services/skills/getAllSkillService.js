import {selectAllskillModel} from '../../models/skills/selectAllSkillsModel.js';         

export const getAllSkillsService = async () => {
    try {
       
        const skill = await selectAllskillModel();
     

    console.log("console de controler:",skill);
    console.log()

    return skill;


    } catch (error) {
      throw error; 
    }
};
