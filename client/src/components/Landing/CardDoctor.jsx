import React from 'react';

const staticPath = import.meta.env.VITE_BACKEND_STATIC;
export const CardDoctor = ({ doctor }) => {
    /* console.log('Esto es lo que tiene la CardDoctor para pintar de doctores',doctor);
  console.log('Esto es lo que tiene Cardoctor doctores.name',doctor.username); */
    /* const entryPhotoPath = `${staticPath}/a/${doctor.userId}/${doctor.id}`; */
    console.log(`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`);

    return (
        <>
            <li className="card-doctor-inicio">
                <img
                    src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`}
                    alt="Foto usuario"
                />
                <h3 className="doctor-name">Doctor: {doctor.username}</h3>
                <p className="doctor-skill">Especialidad {doctor.Name}</p>
                <p className="doctor-rating">
                    Media de valoraciones {doctor.averageRating}
                </p>
            </li>
        </>
    );
};
