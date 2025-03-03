import React from 'react'



const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardConsulta = ({consulta}) => {
 
 
  
  return (
    <>
    <li>
    


    <h5>Titulo: {consulta.Title}</h5>
    <p>identificicador de consulta: {consulta.id}</p>
    <p>Gravedad; {consulta.gravedad}</p>
    <p>Descripcion: {consulta.description}</p>
    <p>Especialidad {consulta.Especialidad}</p>
    <p>Voto: {consulta.vote}</p>
    <p>Diagnostico: {consulta.diagnostic}</p> 
  
    </li>
    
      
    </>
  )
}