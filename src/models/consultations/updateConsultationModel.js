import getPool from "../../db/getPool.js";

export default async function updateConsultationModel(consultationId, userId, updatedData) {
    const pool = await getPool();

    const { title, description, status } = updatedData;

    const [result] = await pool.query(
        `UPDATE consultations 
         SET title = ?, description = ?, status = ?, updatedAt = NOW() 
         WHERE id = ? AND userId = ?`,
        [title, description, status, consultationId, userId]
    );

    return result.affectedRows > 0;
}
