import React /*, { useState }*/ from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const CarruselconsultasNoA = ({ consultasAllAs }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultasAllAs?.consultas || [];
    console.log(consultasAllAs);

    if (!consultasAllAs?.user?.consult) {
        return <div> No tienes consultas</div>;
    }

    return (
        <>
            {/* cambiar la logica para que sean consultas que tengan consulta.doctorId vacio  */}
            <ul className="lista-consultas">
                {consultasAllAs?.consultations?.length > 0 ? (
                    consultasAllAs?.consultations?.map(
                        (consulta) =>
                            consulta.doctorId !== null && (
                                <CardConsulta
                                    key={consulta.id}
                                    consulta={consulta}
                                />
                            )
                    )
                ) : (
                    <p>No hay consultas no asignadas.</p>
                )}
            </ul>
        </>
    );
};
