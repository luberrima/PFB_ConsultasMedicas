import React, { useState } from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const CarruselconsultasNoA = ( {consultasAllAs} ) => {

  const [currentIndex, setCurrentIndex] = useState(0); 
   const photos = consultasAllAs?.consultas || [];  
   console.log(consultasAllAs)
  
   



  return (
    <>
     
      <ul className="ConsultasList">
            {consultasAllAs?.consultations?.length > 0 ? 
                consultasAllAs?.consultations?.map((consulta) => (
                  consulta.doctorId !==null &&
                  <CardConsulta key={consulta.id} consulta={consulta} />
                ))
               : 
                <p>No hay consultas no asignadas.</p>
              }
            </ul>
      
    </>
  );
};