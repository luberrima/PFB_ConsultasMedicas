// import { Button } from '../components/Button.jsx';
//import { Icon } from "../components/Icon.jsx";

import { CarruselDoctor } from '../components/Landing/CarruselDoctor.jsx';
import { Link /*useNavigate*/ } from 'react-router-dom';

import logo from '../assets/good-doctor-logo.svg';
import deco from '../assets/asset-home.svg';
import equipo from '../assets/Fotomedicos.png'; // Equipo medico
import famila from '../assets/madrehijotablet.jpg'; // familiatablet
import { useAllDoctor } from '../hooks/useAllDoctor.js';
import React, { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { Carruselconsultas } from '../components/Landing/CarruselConsultas.jsx';
import { useAllConsultas } from '../hooks/useAllConsultas.js';
import { jwtDecode } from 'jwt-decode';
import { Carruselconsultaspasadas } from '../components/Landing/CarruselConsultaspasadas.jsx';
import { CarruselconsultasNoA } from '../components/Landing/CarruselConsultasNoA.jsx';
import { CarruselconsultasActivas } from '../components/Landing/CarruselConsultasActivas.jsx';
import { useAllConsultasNoAsig } from '../hooks/useAllConsultasNoAsig.js';
import { useAllUser } from '../hooks/useAllUser.js';
import { AllUserList } from '../components/Admin/AllUserList.jsx';

export const HomePage = () => {
    const { token } = useContext(AuthContext);

    const decodedToken = token ? jwtDecode(token) : null;

    const { doctors /*, loading, error */ } = useAllDoctor();
    const { consultas /*,loading2, error2*/ } = useAllConsultas();
    const { consultasAllAs /*,loading3, error3*/ } = useAllConsultasNoAsig();
    const [listUsers,setListUsers] =useState();
    const [refreshCounter, setRefreshCounter] = useState(0);
    const { users } = useAllUser(refreshCounter);
 
     

    useEffect(() => {
        if (users) {
            setListUsers(users);
        }
      }, [users]); 

      const refreshLink = (nuevosDatos) => {
        setRefreshCounter(prev => prev + 1); 
        
      };




    return (
        <>
            {decodedToken && decodedToken.role === 'paciente' ? (
                //
                // USUARIO REGISTRADO - PACIENTE
                //

                <>
                    <section className="seccion seccion-inicio">
                        <div className="logo-register">
                            <img src={logo} alt="logo de la app" />
                        </div>
                        <div>
                            <img
                                className="seccion-inicio-deco"
                                src={deco}
                                alt="recurso decorativo"
                            />
                        </div>
                    </section>
                    <section className="seccion-consultas">
                        <h1 className="page-title">Tus Consultas</h1>
                        <Carruselconsultas consultas={consultas} />
                    </section>
                    <CarruselDoctor doctors={doctors} />
                </>
            ) : decodedToken && decodedToken.role === 'doctor' ? (
                //
                // USUARIO REGISTRADO - DOCTOR
                //

                <>
                    <section className="seccion seccion-inicio">
                        <div className="logo-register">
                            <img src={logo} alt="logo de la app" />
                        </div>
                        <div>
                            <img
                                className="seccion-inicio-deco"
                                src={deco}
                                alt="recurso decorativo"
                            />
                        </div>
                    </section>
                    <section className="seccion-consultas">
                        <h1 className="page-title">Tus Consultas Activas</h1>
                        <CarruselconsultasActivas consultas={consultas} />
                    </section>
                    <section className="seccion-consultas">
                        <h3 className="page-title">Tus Consultas Pasadas </h3>
                        <Carruselconsultaspasadas consultas={consultas} />
                    </section>
                    <section className="seccion-consultas">
                        <h3 className="page-title">Consultas no asignadas</h3>
                        <CarruselconsultasNoA consultasAllAs={consultasAllAs} />
                    </section>
                </>
            ) : decodedToken && decodedToken.role === 'admin' ? (
                <section className="admin-page">
                    <h3 className="page-title">ERES EL ADMINISTRADOR</h3>
                    <h2 className="page-title-2">Todos los Usuarios</h2>
                    <AllUserList users={listUsers} refreshLink={refreshLink} />
                </section>
            ) : (
                //
                // USUARIO NO REGISTRADO
                //

                <>
                    <section className="seccion seccion-inicio">
                        <div>
                            <img
                                className="logo-app-noregister"
                                src={logo}
                                alt="logo de la app"
                            />
                            <p>
                                Te damos la bienvenida a GoodDoctor, la
                                plataforma que revoluciona la atención médica en
                                línea. Aquí puedes registrar tu perfil como
                                paciente, realizar consultas médicas detalladas
                                según tus síntomas, elegir la especialidad
                                adecuada y recibir respuestas de médicos
                                certificados. Nuestro objetivo es brindarte una
                                experiencia segura, ágil y confiable, para que
                                puedas resolver tus dudas de salud sin necesidad
                                de trasladarte a un centro médico.
                            </p>
                            <Link to="/signup" className="btn btn-naranja">
                                Registro
                            </Link>
                        </div>
                        <div>
                            <img
                                className="seccion-inicio-deco"
                                src={deco}
                                alt="recurso decorativo"
                            />
                        </div>
                    </section>

                    <CarruselDoctor doctors={doctors} />

                    <section className="seccion seccion-info">
                        <article>
                            <img src={equipo} alt="Foto de equipo medico" />
                            <div>
                                <h3>Equipo médico a tu disposición</h3>
                                <p>
                                    En GoodDoctor, contamos con un equipo de
                                    médicos verificados y especializados en
                                    distintas áreas de la salud, quienes están
                                    disponibles para responder tus consultas de
                                    manera rápida y profesional. Cada
                                    diagnóstico o recomendación médica que
                                    recibas puede ser valorada por los
                                    pacientes, promoviendo la transparencia y
                                    asegurando un servicio de alta calidad.
                                    Además, nuestro sistema te permite hacer un
                                    seguimiento de tus consultas para mantener
                                    un historial médico accesible en todo
                                    momento.{' '}
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
                                    Si buscas un especialista en particular,
                                    puedes acceder a nuestro directorio médico y
                                    conocer en detalle la experiencia,
                                    especialización y calificaciones de cada
                                    profesional. Encuentra al médico que mejor
                                    se adapte a tus necesidades y obtén
                                    respuestas confiables con la tranquilidad de
                                    saber que estás en manos de expertos. En
                                    GoodDoctor, la salud está a un clic de
                                    distancia.{' '}
                                </p>
                            </div>
                        </article>
                    </section>

                    <section className="seccion seccion-banner">
                        <h3>Empieza a usar GoodDoctor</h3>
                        <p>
                            Regístrate o inicia sesión para realizar consultas,
                            recibir diagnósticos y conectar con médicos
                            certificados.
                        </p>
                        <div>
                            <span>
                                <Link to="/registro" className="btn btn-azul">
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
                </>
            )}
        </>
    );
};
