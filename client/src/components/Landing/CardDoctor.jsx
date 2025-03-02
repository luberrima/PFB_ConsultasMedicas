import React from 'react'
import { Icon } from '../Icon.jsx'


const staticPath = import.meta.env.VITE_BACKEND_STATIC;
export const CardDoctor = ({doctor}) => {
  /* console.log('Esto es lo que tiene la CardDoctor para pintar de doctores',doctor);
  console.log('Esto es lo que tiene Cardoctor doctores.name',doctor.username); */
 /* const entryPhotoPath = `${staticPath}/a/${doctor.userId}/${doctor.id}`; */
 console.log(`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`);
 
  
  return (
    <>
    <li>
    <img src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`} alt="Foto usuario" />
    <h3>Doctor: {doctor.username}</h3>
    <p>Especialidad {doctor.Name}</p>
    <p>Media de valoraciones {doctor.averageRating}</p>
    </li>
    
      
    </>
  )
}


