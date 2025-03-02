import React from 'react';
import { CardDoctor } from '../components/Landing/CardDoctor.jsx';
import { useAllDoctor } from '../hooks/useAllDoctor.js';


export const AllDoctorPage = () => {

    const { doctors, loading, error } = useAllDoctor();

   console.log(doctors);
    
  const doctorList = doctors?.doctors || []; // Asegurarse de que tenemos los doctores

  return (
    <div className="doctors-page">
      <h1>Todos los Médicos</h1>
      <ul className="DoctorsList">
        {/* Mapeamos todos los doctores para mostrarlos */}
        {doctorList.map((doctor) => (
          <CardDoctor key={doctor.id} doctor={doctor} />
        ))}
      </ul>
    </div>
  );
};



















/* import React from 'react'
import { CarruselDoctor } from '../components/Landing/CarruselDoctor.jsx';

import { useAllDoctor } from '../hooks/useAllDoctor.js';

export const AllDoctorPage = () => {
    const { doctors, loading, error } = useAllDoctor(); 
  return (
    <CardDoctor doctors={doctors} />
  )
}
 */

