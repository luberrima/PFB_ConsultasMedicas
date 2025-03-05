import React from 'react';
import { Estrellas } from '../Estrellas.jsx';

const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardDoctor = ({ doctor }) => {
    return (
        <>
            <li className="card-doctor-inicio">
                <a
                    href={`/users/doctors/${doctor.userId}`}
                    className="card-doctor-inicio-avatar"
                >
                    <img
                        src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`}
                        alt="Foto usuario"
                    />
                </a>
                <h3>{doctor.username}</h3>
                <p>{doctor.Name}</p>
                <Estrellas rating={doctor.averageRating} />
            </li>
        </>
    );
};
