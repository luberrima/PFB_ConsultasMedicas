import React, { useState } from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { CardDoctor } from '../../components/Landing/CardDoctor.jsx';
import { useAllDoctor } from '../../hooks/useAllDoctor.js';


const staticPath = import.meta.env.VITE_BACKEND_STATIC;
import { useDoctorProfile } from '../../hooks/useDoctorProfile.js';


export const DoctorUserProfile =  ({doctorId}) => {
console.log("doctor user profile id data",doctorId);
const { doctorsbio, loadingbio, errorbio } =  useDoctorProfile (doctorId);
const { doctors, loading, error } = useAllDoctor();
const doctorList = doctors?.doctors || [];



let anios=0;
let valoracion=0;
const doctorinfo = doctorsbio?.data || {}; //
if (typeof doctorinfo=== undefined)
{
  return <div> Perfil del doctor No disponible</div>;  
}
else 
{
  if (typeof doctorList=== undefined)
    {
      return <div> Perfil del doctor No disponible</div>; 
    }
    else
    {
      console.log("datos cargados dedoctorList",doctorList);
    }

  console.log("datos cargados de doctorinfo",doctorinfo);
  
  if (!doctorinfo?.userDoctor?.media_valoracion)
    {valoracion=0}
  else
  {
    valoracion=Math.round(doctorinfo?.userDoctor?.media_valoracion)
    
  }

  if (!doctorinfo?.userDoctor?.dateOfCollege)
    {anios=0}
  else
  {

  const fechaInicio = new Date(doctorinfo?.userDoctor?.dateOfCollege); // Convertimos el string en fecha
  const fechaActual = new Date();
  
  anios = fechaActual.getFullYear() - fechaInicio.getFullYear();

  // Ajuste si aún no ha pasado el aniversario este año
  if (
    fechaActual.getMonth() < fechaInicio.getMonth() || 
    (fechaActual.getMonth() === fechaInicio.getMonth() && fechaActual.getDate() < fechaInicio.getDate())
  ) {
    anios--;
  }
};
}
const handleClickConsulta = () => {
  navigate('/registro');
};

 return (
    <>
   <section className="ficha">
    <section className="Imagen">
      <img src={`${staticPath}/avatars/${ doctorinfo?.userDoctor?.id}/${doctorinfo?.userDoctor?.avatar}`} alt="Foto usuario" />
      </section>
    <section clasName="Informacion">
      <ul>
        <li>
        <h3>Doctor:</h3><p>{doctorinfo?.userDoctor?.username}</p>
        </li>
        <li>
        <h3>Bio:</h3><p>{doctorinfo?.userDoctor?.bio}</p>
        </li>
        <li>
        <h3>Especialidad:</h3><p>{doctorinfo?.userDoctor?.Name}</p>
        </li>
        <li>
        <h3>Años de Experiencia:</h3><p>{anios}</p>
        </li>
        <li>
        <h3>Numero de colegiado:</h3><p>{doctorinfo?.userDoctor?.collegeNumber}</p>
        </li>
      </ul>
    </section>
    <section className="Nueva consulta">
    <Button onClick={handleClickConsulta} className="consultabancido">
                    Nueva consulta
                </Button>
    </section>

    <section className="valoracion">
      <h3>Valoracion del doctor</h3>
      <ul>
        <li>Consultas Totales      :{doctorinfo?.userDoctor?.ConsultasTotales}</li>
        <li>Consultar respondidas  :{doctorinfo?.userDoctor?.total_respuestas}</li>
        <li>Valoraciones recibidas :{doctorinfo?.userDoctor?.Votos_recibidos}</li>
        <li>Media de valoraciones  :{valoracion}</li>
      </ul>
    
    </section>
    <section className="carrusel">
     <ul className="DoctorsList">
            {/* Mapeamos todos los doctores para mostrarlos */}
            {console.log("valor de doctorList en el ul",doctorList)}
            {doctorList.map((doctor) => (
              <CardDoctor key={doctor.id} doctor={doctor} />
            ))}
          </ul>


    </section>
    </section>
    </>
  );
};




