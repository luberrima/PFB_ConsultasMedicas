import React from 'react'
import { Icon } from '../Icon.jsx'
import { Link } from 'react-router-dom';


const staticPath = import.meta.env.VITE_BACKEND_STATIC;
export const CardDoctor = ({ doctor }) => {
    /* console.log('Esto es lo que tiene la CardDoctor para pintar de doctores',doctor);
  console.log('Esto es lo que tiene Cardoctor doctores.name',doctor.username); */
 /* const entryPhotoPath = `${staticPath}/a/${doctor.userId}/${doctor.id}`; */

 
  
  return (
    <>
    <li>
    <a href={`/users/doctors/${doctor.userId}`}  className="doctor-link">
                        <img src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`} alt="Foto usuario" /></a>
    <h3>Doctor: {doctor.username}</h3>
    <p>Especialidad {doctor.Name}</p>
    <p>Media de valoraciones {doctor.averageRating}</p>
    </li>
    
      
    </>
  )
}


