import { getAllUserService } from "../../services/admin/getAllUserService.js";


export const getAllUserController = async (req, res, next)=> {
try {
    const consultations = await getAllUserService();
    res.status(200).send({
        status: 'ok',
        message: 'lista de Usuarios',
        data: { consultations },
    });
} catch (error) {
  next(error);  
}

}