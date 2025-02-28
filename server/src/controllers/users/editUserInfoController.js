import { editUserInfoService } from '../../services/users/editUserInfoService.js';
//import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
//import { editUserPassSchema } from '../../schemas/users/editUserPassSchema.js';

export const editUserInfoController = async (req, res, next) => {
    try {
        const { nombre,  bio, collegeNumber,  dateOfCollege } = req.body;
        const { id } =req.user;

       // await validateSchemaUtil(editUserBioSchema, req.body);
        const result = await editUserInfoService(id,nombre,  bio, collegeNumber,  dateOfCollege);

        res.send({
            status: 'ok',
            message: result,
        });
    } catch (err) {
        next(err);
    }
};
