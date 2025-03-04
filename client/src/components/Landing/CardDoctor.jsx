import React from 'react'
import { Estrellas } from '../Estrellas.jsx';



const staticPath = import.meta.env.VITE_BACKEND_STATIC;
export const CardDoctor = ({ doctor }) => {
 
  
  return (
    <>
    <li>
    <a href={`/users/doctors/${doctor.userId}`}  className="doctor-link">
                        <img src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`} alt="Foto usuario" /></a>
    <h3>Doctor: {doctor.username}</h3>
    <p>Especialidad {doctor.Name}</p>
    <p>Media de valoraciones: </p>
        <Estrellas rating={doctor.averageRating}/>
    </li>
    
      
    </>
  )
}


