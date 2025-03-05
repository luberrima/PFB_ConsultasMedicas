import React /*, { useState }*/ from 'react';
// import { CardDoctor } from './CardDoctor.jsx';
// import { Button } from '../Button.jsx';
// import { Icon } from '../Icon.jsx';
import { CardConsulta } from './CardConsulta.jsx';
import './cardConsulta.css';

export const Carruselconsultas = ({ consultas }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    //  const photos = consultas?.consultas || [];

    if (consultas?.user?.consult === undefined) {
        return <div> No tienes consultas</div>;
    }

    return (
        <>
            <ul className="lista-consultas">
                {consultas?.user?.consult.map((consulta /*, index*/) => (
                    <CardConsulta key={consulta.id} consulta={consulta} />
                ))}
            </ul>
        </>
    );
};
