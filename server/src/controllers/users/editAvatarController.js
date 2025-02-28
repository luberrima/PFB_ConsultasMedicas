import { editAvatarService } from '../../services/users/editAvatarService.js';

export const editAvatarController = async (req, res, next) => {
    try {
        
        const { id } =req.user;
        const { avatar } = req.files;



       // await validateSchemaUtil(editUserBioSchema, req.body);
        const result = await editAvatarService(id,avatar);

        res.send({
            status: 'ok',
            message: result,
        });
    } catch (err) {
        next(err);
    }
};
