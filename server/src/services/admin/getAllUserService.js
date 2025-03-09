import { getAllUserModel } from "../../models/admin/getAllUserModel.js";

import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const getAllUserService = async ()=> {
    const consultations = await getAllUserModel();

    if(!consultations.length) {
        throw genereErrorUtils (404, "NO_USER_FOUND", "No se han encontrado Usuarios");

    }
return consultations;
};