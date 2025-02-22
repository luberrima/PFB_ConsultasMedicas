import { getPool } from '../../db/getPool.js';

export const getDoctorsWithRatingsModel = async () => {
    const pool = await getPool();

    const [doctors] = await pool.query(
        `
            SELECT D.*, U.id AS userId, U.username, U.email, 
                   AVG(C.vote) AS averageRating
            FROM doctors D
            LEFT JOIN users U ON D.userId = U.id
            LEFT JOIN consultations C ON D.userId = C.doctorId
            GROUP BY D.id, U.id, U.username, U.email;
        `
    );
    return doctors;
};
