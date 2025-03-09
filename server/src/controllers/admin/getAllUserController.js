import { getAllUserService } from "../../services/admin/getAllUserService.js";


export const getAllUserController = async (req, res, next)=> {
try {
    const users = await getAllUserService();
    res.status(200).send({
        status: 'ok',
        message: 'lista de Usuarios',
        data: { users },
    });
} catch (error) {
  next(error);  
}

}