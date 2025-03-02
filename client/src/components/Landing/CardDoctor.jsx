import React from 'react'
import { Icon } from '../Icon.jsx'

export const CardDoctor = ({doctor}) => {
  /* console.log('Esto es lo que tiene la CardDoctor para pintar de doctores',doctor);
  console.log('Esto es lo que tiene Cardoctor doctores.name',doctor.username); */

  
  return (
    <>
    <li>
    <Icon name='account_circle' />
    <h3>Doctor: {doctor.username}</h3>
    <p>Especialidad {doctor.skillId}</p>
    <p>Media de valoraciones {doctor.averageRating}</p>
    </li>
    
      
    </>
  )
}


