import { getPool } from '../../db/getPool.js';

export const getAllConsultationModel = async (idUser, role) => {
    const pool = await getPool();

    let consultations_not_resolved;
    let noasignadas;
    let consultations_resolved

    if(role === "paciente"){

            consultations_resolved = await pool.query(
            `SELECT * FROM consultations WHERE userId = ?` , [idUser]
            );

            consultations_not_resolved = await pool.query(
                `SELECT * FROM consultations WHERE userId = ?` , [idUser]
                );
    


    }else{
        // queri para ver la especialidad del doctor
        let consultations_not_resolved;
        let noasignadas;
        let consultations_resolved

    }



    return { asignadas: consultations_not_resolved ,
        noasignadas: noasignadas,
        resueltas: consultations_not_resolved
       };
};