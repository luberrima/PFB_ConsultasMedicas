import { getDoctorsWithRatingsService } from '../../services/users/getDoctorsWithRatingsService.js';

export const getDoctorsWithRatingsController = async (req, res, next) => {
    try {
        const doctors = await getDoctorsWithRatingsService();

        res.status(200).send({
            status: 'ok',
            message: 'lista de doctores con su valoración media',
            data: { doctors },
        });
    } catch (error) {
        next(error);
    }
};
