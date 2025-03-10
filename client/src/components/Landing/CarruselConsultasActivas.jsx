import React /*, { useState }*/ from 'react';

import { CardConsulta } from './CardConsulta.jsx';

export const CarruselconsultasActivas = ({ consultas }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultas?.consultas || [];

    //  let miArray = [];

    if (!consultas?.user?.consult) {
        return <p className="consulta-not-found"> No tienes consultas</p>;
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
                    <p className="consulta-not-found">
                        No hay consultas activas
                    </p>
                )}
            </ul>
        </>
    );
};
