import React from 'react';
import { Estrellas } from '../Estrellas.jsx';
import avatardefault from "../../assets/avatar-default.jpg"

const staticPath = import.meta.env.VITE_BACKEND_STATIC;



export const CardDoctor = ({ doctor }) => {

    let urlavatar="/src/assets/avatar-default.png"
    if(doctor.avatar)
    {
        urlavatar=`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`;
    }
    

    return (
        <>
            <li className="card-doctor-inicio">
                <a
                    href={`/users/doctors/${doctor.userId}`}
                    className="card-doctor-inicio-avatar"
                >
                    <img
                        src={urlavatar}
                        alt="Foto usuario"
                        onError={(e) => {
                            e.target.onerror = null;  
                            e.target.src = avatardefault; 
                        }}
                    />
                </a>
                <h3>{doctor.username}</h3>
                <p>{doctor.Name}</p>
                <Estrellas rating={doctor.averageRating} />
            </li>
        </>
    );
};
