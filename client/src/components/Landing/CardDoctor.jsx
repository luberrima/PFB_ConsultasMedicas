import React from 'react';
import avatardefault from '../../assets/avatar-default.png';
//import { Icon } from '../Icon.jsx';

export const CardDoctor = ({ doctor }) => {
    /* console.log('Esto es lo que tiene la CardDoctor para pintar de doctores',doctor);
  console.log('Esto es lo que tiene Cardoctor doctores.name',doctor.username); */

    return (
        <>
            <li className="card-doctor-inicio">
                <img src={avatardefault} alt="avatar-default" />
                <h3 className="doctor-name">{doctor.username}</h3>
                <p className="doctor-skill">{doctor.skillId}</p>
                <p className="doctor-rating">
                    Media de valoraciones {doctor.averageRating}
                </p>
            </li>
        </>
    );
};
