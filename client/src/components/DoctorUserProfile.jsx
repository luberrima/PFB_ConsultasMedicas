import React from 'react';
import { useContext } from 'react';
import { Button } from './Button.jsx';
import { useAllDoctor } from '../hooks/useAllDoctor.js';
import avatardefault from '../assets/avatar-default.jpg';
import { useDoctorProfile } from '../hooks/useDoctorProfile.js';
import { useNavigate } from 'react-router-dom';
import { CardAllInfoDoctor } from './CardAllInfoDoctor.jsx';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/auth/AuthContext.js";


const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const DoctorUserProfile = ({ doctorId }) => {

    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;
    const { doctorsbio } = useDoctorProfile(doctorId);
    const { doctors } = useAllDoctor();
    const doctorList = doctors?.doctors || [];
    const navigate = useNavigate();

    const doctorinfo = doctorsbio?.data || {}; 
    const userDoctor = doctorinfo?.userDoctor?.[0] || {};

    if (!userDoctor || Object.keys(userDoctor).length === 0) {
        return <div>Perfil del doctor No disponible</div>;
    }

    let anios = 0;
    let valoracion = doctorinfo?.userDoctor?.media_valoracion ? Math.round(doctorinfo?.userDoctor?.media_valoracion) : 0;

    if (userDoctor?.dateOfCollege) {
        const fechaInicio = new Date(userDoctor.dateOfCollege);
        const fechaActual = new Date();
        anios = fechaActual.getFullYear() - fechaInicio.getFullYear();
        if (
            fechaActual.getMonth() < fechaInicio.getMonth() ||
            (fechaActual.getMonth() === fechaInicio.getMonth() && fechaActual.getDate() < fechaInicio.getDate())
        ) {
            anios--;
        }
    }

    const handleClickConsulta = () => {
        navigate(`/new-consult/${doctorId}/${userDoctor.skillId}`);
    };

    return (
        <>
            <section className="ficha-user">
                <article className="ficha-user-container">
                    <article className="ficha-user-img">
                        <img
                            src={`${staticPath}/avatars/${userDoctor.id}/${userDoctor.avatar}`}
                            alt="Foto usuario"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = avatardefault;
                            }}
                        />
                    </article>
                    <article className="ficha-user-info">
                        <ul>
                            <li><h3>Nombre</h3><p>{userDoctor.nombre || 'No disponible'}</p></li>
                            <li><h3>Nombre de usuario</h3><p>{userDoctor.username}</p></li>
                            <li><h3>Biografía</h3><p>{userDoctor.bio || 'No disponible'}</p></li>
                            <li><h3>Especialidad</h3><p>{userDoctor.Name || 'No disponible'}</p></li>
                            <li><h3>Años de Experiencia</h3><p>{anios}</p></li>
                            <li><h3>Número de colegiad@</h3><p>{userDoctor.collegeNumber || 'No disponible'}</p></li>
                        </ul>
                        {decodedToken?.role === "paciente" && (
                        <Button handleClick={handleClickConsulta} className="btn btn-azul">
                          Nueva consulta
                         </Button>
                        )}
                    </article>
                </article>

                <article className="ficha-medico-rating">
                    <h3>Valoración del doctor</h3>
                    <ul>
                        <li><h4>Consultas Totales</h4><p>{doctorinfo?.userDoctor?.ConsultasTotales || 0}</p></li>
                        <li><h4>Consultas respondidas</h4><p>{doctorinfo?.userDoctor?.total_respuestas || 0}</p></li>
                        <li><h4>Valoraciones recibidas</h4><p>{doctorinfo?.userDoctor?.Votos_recibidos || 0}</p></li>
                        <li><h4>Media de valoraciones</h4><p>{valoracion}</p></li>
                    </ul>
                </article>
            </section>
            <section className="ficha-medico-carrusel">
                <h3 className="page-title">Otros Especialistas</h3>
                <ul className="lista-doctores">
                    {doctorList.map((doctor) => (
                        <CardAllInfoDoctor key={doctor.id} doctor={doctor} />
                    ))}
                </ul>
            </section>
        </>
    );
};