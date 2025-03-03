import { getPool } from '../../db/getPool.js';

export const getDoctorsWithRatingsModel = async () => {
    const pool = await getPool();

    const [doctors] = await pool.query(
        `
<<<<<<< HEAD
            SELECT D.*, U.id AS userId, U.username, U.email, U.avatar, S.Name,
=======
              SELECT D.*, U.id AS userId, U.username, U.email, U.avatar, S.Name,
>>>>>>> 1da5ebd0ee710f3a21c43280292376d143038c48
                   AVG(CASE WHEN C.vote IS NOT NULL THEN C.vote END) AS averageRating
            FROM doctors D
            LEFT JOIN users U ON D.userId = U.id
            LEFT JOIN consultations C ON D.userId = C.doctorId
            LEFT JOIN skills S ON D.skillId = S.id
            WHERE D.validate = 1
            GROUP BY D.id, U.id, U.username, U.email;
        `
    );
    return doctors;
};
