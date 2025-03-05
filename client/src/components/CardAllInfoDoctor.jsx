import React from 'react'
import { Link } from 'react-router-dom';
import { Estrellas } from './Estrellas.jsx';



const staticPath = import.meta.env.VITE_BACKEND_STATIC;
export const CardAllInfoDoctor = ({ doctor }) => {
  
  return (
    <>
    <li>
    <a href={`/users/doctors/${doctor.userId}`}  className="doctor-link">
                        <img src={`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`} alt="Foto usuario" /></a>
    <p>Media de valoraciones: </p>
    <Estrellas rating={doctor.averageRating}/>
    <h3>Doctor@: {doctor.username}</h3>
    <p>Especialidad: {doctor.Name}</p>
    <p>Especialidad por numero: {doctor.skillId}</p>
    <p>Biografia del doctor: {doctor.bio}</p>
    <p>Email: {doctor.email}</p>
    <p>Numero de colegiado:  {doctor.CollegeNumber}</p>
    <p>Fecha de inicio en GoodDoctor: {doctor.credatedAt}</p>
    <p>Identificacion en GoodDoctor {doctor.UserId}</p>
    <Link
        to="/new-consult"
        className="navbar-link new-consultation-link">Hacer una consulta
    </Link>
    
    </li>
    
      
    </>
  )
}