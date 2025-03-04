
// import { Button } from '../components/Button.jsx';
//import { Icon } from "../components/Icon.jsx";


import { CarruselDoctor } from '../components/Landing/CarruselDoctor.jsx';
import { Link /*useNavigate*/ } from 'react-router-dom';

import logo from '../assets/good-doctor-logo.svg';
import deco from '../assets/asset-home.svg';
import equipo from '../assets/Fotomedicos.png'; // Equipo medico
import famila from '../assets/madrehijotablet.jpg'; // familiatablet
import { useAllDoctor } from '../hooks/useAllDoctor.js';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { Carruselconsultas } from '../components/Landing/CarruselConsultas.jsx';
import { useAllConsultas } from '../hooks/useAllConsultas.js';
import {jwtDecode } from 'jwt-decode';
import { Carruselconsultaspasadas } from '../components/Landing/CarruselConsultaspasadas.jsx';
import { CarruselconsultasNoA } from '../components/Landing/CarruselConsultasNoA.jsx';
import { CarruselconsultasActivas } from '../components/Landing/CarruselConsultasActivas.jsx';
import { useAllConsultasNoAsig } from '../hooks/useAllConsultasNoAsig.js';

export const HomePage = () => {

    const { token } = useContext(AuthContext);

   const decodedToken = jwtDecode(token);
   
    
    
    const { doctors, loading, error } = useAllDoctor(); 
    const { consultas,loading2, error2 } = useAllConsultas(); 
    const { consultasAllAs,loading3, error3 } = useAllConsultasNoAsig(); 

    /* console.log('Esto es lo que tiene la homepage para ontar de Consultas',consultas);   */
    const navigate = useNavigate();
    


    // const handleClickRegistro = () => {
    //     navigate('/registro');
    // };
    // const handleClickLogin = () => {
    //     navigate('/login');
    // };


    return (
        <>
            <main>


               <section>
                    {
                     decodedToken.role === "paciente" ?(
                        <>
                            <h3>Aqui tienes tus consultas</h3>
                            <Carruselconsultas consultas={consultas} />
                    </>
                    ): decodedToken.role === "doctor" ?(<>
                        <h3>Aqui tienes tus consultas Activas</h3>
                        <CarruselconsultasActivas consultas={consultas} />
                        <h3>Aqui tienes tus consultas Pasadas </h3>
                        <Carruselconsultaspasadas consultas={consultas} />
                        <h3>Aqui tienes consultas no asignadas</h3>
                        <CarruselconsultasNoA consultasAllAs={consultasAllAs} />
                </>
                ): (
                    <h3>No tienes permisos para ver esta sección</h3>  // Mensaje para otros roles
                  )
                }
               </section> 

                <section>
                    <h3>Conoce a Nuestros profesionales</h3>
                        <CarruselDoctor doctors={doctors} />
                </section>
                                
                <section>

                <section className="seccion seccion-inicio">
                    <div>
                        <img src={logo} alt="logo de la app" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Corrupti laudantium iste suscipit aut beatae
                            quaerat accusamus illo adipisci veniam minus, cumque
                            recusandae ratione autem quas dolores quos commodi
                            obcaecati possimus!
                        </p>
                        <Link to="/signup" className="btn btn-naranja">
                            Registro
                        </Link>
                    </div>
                    <div>
                        <img src={deco} alt="recurso decorativo" />
                    </div>
                </section>

                <CarruselDoctor doctors={doctors} />

                <section className="seccion seccion-info">

                    <article>
                        <img src={equipo} alt="Foto de equipo medico" />
                        <div>
                            <h3>Equipo medico a tu disposición</h3>
                            <p>
                                Un lugar al que pertenecer, en el que puedes
                                encontrar una red amplia de médicos a tu
                                disposición y elección, ya que puedes ver su
                                ratio de satisfacción de sus diagnósticos.{' '}
                            </p>
                        </div>
                    </article>
                    <article>
                        <img
                            src={famila}
                            alt="Foto de madre e hijo con una tablet"
                        />
                        <div>
                            <h3>En cualquier momento y lugar</h3>
                            <p>
                                Puedes encontrar diagnóstico de médicos sobre
                                tus dolencias y todo a unos pocos clips. Puedes
                                formar parte de nuestra comunidad, ver tu
                                historial por si algún dolor o duda regresa.
                                Todo ello en un entorno cómodo, intuitivo y
                                responsive, puede verlo en tu Tablet, ordenador
                                o teléfono.{' '}
                            </p>
                        </div>
                    </article>
                </section>

                <section className="seccion seccion-banner">
                    <h3>Empieza a usar good doctor</h3>
                    <p>
                        Un lugar al que pertenecer, en el que puedes encontrar
                        diagnóstico de médicos sobre tus dolencias y todo a unos
                        pocos clicks.
                    </p>
                    <div>
                        <span>
                            <Link to="/signup" className="btn btn-azul">
                                Registro
                            </Link>
                        </span>
                        <span>
                            <Link to="/login" className="btn btn-blanco">
                                Login
                            </Link>
                        </span>
                    </div>
                </section>
            </main>
            <footer></footer>

        </>
    );
};
