import React from 'react';
import { useAllDoctor } from '../hooks/useAllDoctor.js';
import { CardAllInfoDoctor } from '../components/CardAllInfoDoctor.jsx';

import '../components/cardAllInfoDoctor.css';

export const AllDoctorPage = () => {
    const { doctors /*, loading, error */ } = useAllDoctor();

    const doctorList = doctors?.doctors || []; // Asegurarse de que tenemos los doctores

    return (
        <div className="doctors-page">
            <h1 className="page-title">Todos los Médicos</h1>
            <ul className="lista-doctores">
                {/* Mapeamos todos los doctores para mostrarlos */}
                {doctorList.map((doctor) => (
                    <CardAllInfoDoctor key={doctor.id} doctor={doctor} />
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
