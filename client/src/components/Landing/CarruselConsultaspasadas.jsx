import React /*, { useState }*/ from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const Carruselconsultaspasadas = ({ consultas }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultas?.consultas || [];

    if (!consultas?.user?.consult) {
        return <p className="consulta-not-found"> No tienes consultas</p>;
    }

    return (
        <>
            <ul className="lista-consultas">
                {consultas?.user?.consult.length > 0 ? (
                    consultas?.user?.consult.map(
                        (consulta) =>
                            consulta.vote !== null && (
                                <CardConsulta
                                    key={consulta.id}
                                    consulta={consulta}
                                />
                            )
                    )
                ) : (
                    <p>No hay consultas pasadas.</p>
                )}
            </ul>
        </>
    );
};
