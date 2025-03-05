import React /*, { useState }*/ from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const CarruselconsultasActivas = ({ consultas }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultas?.consultas || [];

    //  let miArray = [];

    if (!consultas?.user?.consult) {
        return <div> No tienes consultas</div>;
    }

    return (
        <>
            <ul className="lista-consultas">
                {consultas.user.consult.length > 0 ? (
                    consultas.user.consult.map(
                        (consulta) =>
                            consulta.vote === null && (
                                <CardConsulta
                                    key={consulta.id}
                                    consulta={consulta}
                                />
                            )
                    )
                ) : (
                    <p>No hay consultas activas</p>
                )}
            </ul>
        </>
    );
};
