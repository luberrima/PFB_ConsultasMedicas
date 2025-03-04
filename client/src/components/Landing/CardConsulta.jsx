import React from 'react';
import { Estrellas } from '../Estrellas.jsx';

// const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardConsulta = ({ consulta }) => {
    return (
        <>
            <li className="card-consulta">
                <header>
                    <p>{consulta.Especialidad}</p>
                    <p>{consulta.gravedad}</p>
                </header>
                <main>
                    <h5>
                        {/* Título de la consulta:  */}
                        {consulta.title}
                    </h5>
                    {/* <p>identificicador de consulta: {consulta.id}</p> */}
                    <p>
                        {/* Descripcion:  */}
                        {consulta.description}
                    </p>
                </main>
                <footer>
                    <Estrellas rating={consulta.vote} />
                </footer>
                {/* <p>Diagnostico: {consulta.diagnostic}</p> */}
            </li>
        </>
    );
};
