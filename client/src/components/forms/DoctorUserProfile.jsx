import React /*, { useState }*/ from 'react';
import { Button } from '../Button.jsx';
// import { Icon } from '../Icon.jsx';
import { CardDoctor } from '../../components/Landing/CardDoctor.jsx';
import { useAllDoctor } from '../../hooks/useAllDoctor.js';

const staticPath = import.meta.env.VITE_BACKEND_STATIC;
import { useDoctorProfile } from '../../hooks/useDoctorProfile.js';
import { useNavigate } from 'react-router-dom';

export const DoctorUserProfile = ({ doctorId }) => {
    console.log('doctor user profile id data', doctorId);
    const { doctorsbio /*, loadingbio, errorbio*/ } =
        useDoctorProfile(doctorId);
    const { doctors /*, loading, error*/ } = useAllDoctor();
    const doctorList = doctors?.doctors || [];
    const navigate = useNavigate();

    let anios = 0;
    let valoracion = 0;
    const doctorinfo = doctorsbio?.data || {}; //
    if (/* typeof  */ doctorinfo === undefined) {
        return <div> Perfil del doctor No disponible</div>;
    } else {
        if (/* typeof */ doctorList === undefined) {
            return <div> Perfil del doctor No disponible</div>;
        } else {
            console.log('datos cargados dedoctorList', doctorList);
        }

        console.log('datos cargados de doctorinfo', doctorinfo);

        if (!doctorinfo?.userDoctor?.media_valoracion) {
            valoracion = 0;
        } else {
            valoracion = Math.round(doctorinfo?.userDoctor?.media_valoracion);
        }

        if (!doctorinfo?.userDoctor?.dateOfCollege) {
            anios = 0;
        } else {
            const fechaInicio = new Date(doctorinfo?.userDoctor?.dateOfCollege); // Convertimos el string en fecha
            const fechaActual = new Date();

            anios = fechaActual.getFullYear() - fechaInicio.getFullYear();

            // Ajuste si aún no ha pasado el aniversario este año
            if (
                fechaActual.getMonth() < fechaInicio.getMonth() ||
                (fechaActual.getMonth() === fechaInicio.getMonth() &&
                    fechaActual.getDate() < fechaInicio.getDate())
            ) {
                anios--;
            }
        }
    }
    const handleClickConsulta = () => {
        navigate('/registro');
    };

    return (
        <>
            <section className="ficha-medico">
                <article className="ficha-medico-container">
                    <article className="ficha-medico-img">
                        <img
                            src={`${staticPath}/avatars/${doctorinfo?.userDoctor?.id}/${doctorinfo?.userDoctor?.avatar}`}
                            alt="Foto usuario"
                        />
                    </article>
                    <article className="ficha-medico-info">
                        <ul>
                            <li>
                                <h3>Nombre</h3>
                                <p>{doctorinfo?.userDoctor?.username}</p>
                            </li>
                            <li>
                                <h3>Biografía</h3>
                                <p>{doctorinfo?.userDoctor?.bio}</p>
                            </li>
                            <li>
                                <h3>Especialidad</h3>
                                <p>{doctorinfo?.userDoctor?.Name}</p>
                            </li>
                            <li>
                                <h3>Años de Experiencia</h3>
                                <p>{anios}</p>
                            </li>
                            <li>
                                <h3>Número de colegiad@</h3>
                                <p>{doctorinfo?.userDoctor?.collegeNumber}</p>
                            </li>
                        </ul>
                        <Button
                            onClick={handleClickConsulta}
                            className="btn btn-azul"
                        >
                            Nueva consulta
                        </Button>
                    </article>
                </article>

                <article className="ficha-medico-rating">
                    <h3>Valoración del doctor</h3>
                    <ul>
                        <li>
                            <h4>Consultas Totales</h4>
                            <p>{doctorinfo?.userDoctor?.ConsultasTotales}</p>
                        </li>
                        <li>
                            <h4>Consultas respondidas</h4>
                            <p>{doctorinfo?.userDoctor?.total_respuestas}</p>
                        </li>
                        <li>
                            <h4>Valoraciones recibidas</h4>
                            <p>{doctorinfo?.userDoctor?.Votos_recibidos}</p>
                        </li>
                        <li>
                            <h4>Media de valoraciones</h4>
                            <p>{valoracion}</p>
                        </li>
                    </ul>
                </article>
            </section>
            <section className="carrusel">
                <ul className="DoctorsList">
                    {/* Mapeamos todos los doctores para mostrarlos */}
                    {console.log('valor de doctorList en el ul', doctorList)}
                    {doctorList.map((doctor) => (
                        <CardDoctor key={doctor.id} doctor={doctor} />
                    ))}
                </ul>
            </section>
        </>
    );
};
