import React /*, { useState }*/ from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const CarruselconsultasNoA = ({ consultasAllAs }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultasAllAs?.consultas || [];
    console.log(consultasAllAs);

    return (
        <>
            <ul className="lista-consultas">
                {consultasAllAs?.consultations?.length > 0 ? (
                    consultasAllAs?.consultations?.filter((consulta) => !consulta.doctorId) // Filtra consultas sin doctorId
                    .map((consulta) => (
                        <CardConsulta key={consulta.id} consulta={consulta} />
                            )
                    )
                ) : (
                    <p>No hay consultas no asignadas.</p>
                )}
            </ul>
        </>
    );
};
