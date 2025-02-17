import { getAllDoctorsService } from '../../services/users/getAllDoctorsService.js';

export const getAllDoctorsController = async (req, res, next) => {
    try {
        const doctors = await getAllDoctorsService();

        res.status(200).send({
            status: 'ok',
            message: 'lista de doctores',
            data: { doctors },
        });
    } catch (error) {
        next(error);
    }
};
