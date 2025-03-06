// import { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { AuthContext } from '../contexts/auth/AuthContext.js';
// import { Button } from '../components/Button.jsx';
// import { getConsultationDetailService } from '../services/fetchBackEnd.js';
// import { VoteForm } from '../components/forms/VoteForm.jsx';

// export const ConsultationPage = () => {
//     const { consultationId } = useParams();
//     console.log('consultation id:', consultationId);
//     const { token } = useContext(AuthContext);
//     const [consultation, setConsultation] = useState(null);

//     useEffect(() => {
//         if (!consultationId || !token) {
//             console.error('Falta el ID o el token');
//             return;
//         }
//         const fetchConsultation = async () => {
//             const response = await getConsultationDetailService(
//                 consultationId,
//                 token
//             );
//             console.log('response en consultationpage:', response);
//             console.log('consultationId en consultation page:', consultationId);
//             console.log('token en consultation page:', token);
//             console.log('response.status:', response.status);

//             if (response.status === 'ok') {
//                 const data = await response.data;
//                 setConsultation(data);
//             } else {
//                 console.error('Error al obtener la consulta');
//             }
//         };
//         fetchConsultation();
//     }, [consultationId, token]);

//     if (!consultation) {
//         return (
//             <div>
//                 <p>No hemos encontrado la consulta</p>
//                 <Link to="/" className="btn btn-azul">
//                     Vuelve a Inicio
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="consultation-info">
//                 <h1 className="page-title">{consultation.title}</h1>
//                 <span>
//                     <h3>Descripción</h3>
//                     <p>{consultation.description}</p>
//                 </span>
//                 <span>
//                     <h3>Gravedad:</h3>
//                     <p>{consultation.gravedad}</p>
//                 </span>
//                 <span>
//                     <h3>Especialidad:</h3>
//                     <p>{consultation.skillId}</p>
//                 </span>
//                 <span>
//                     <h3>Especialista asignado:</h3>
//                     <p>
//                         {consultation.doctorId
//                             ? consultation.doctorId
//                             : 'No hay especialista asignado'}
//                     </p>
//                 </span>
//                 <span>
//                     <h3>Estado de la consulta:</h3>
//                     <p>
//                         {consultation.diagnostic
//                             ? 'Consulta terminada'
//                             : 'Consulta activa'}
//                     </p>
//                 </span>
//                 <div
//                     className={
//                         consultation.diagnostic
//                             ? 'buttons'
//                             : 'buttons-no-display'
//                     }
//                 >
//                     {/* Falta poner acciones a los botones */}
//                     <Button className="btn btn-azul">Concluir consulta</Button>
//                     <Button className="btn btn-naranja">
//                         Eliminar Consulta
//                     </Button>
//                 </div>
//             </div>

//             {/* falta crear componentes fileupload y chat */}
//             <div className="consulta-archivos">
//                 <h3>Archivos subidos</h3>
//                 {/* <FileUpload consultaId={id} /> */}
//             </div>

//             {/* !!!!!!! HAY QUE HACER UN CONTEXTO DE CUANDO HAY O NO DIAGNÓSTICO!!!!!!!
//             y aplicarlo al chat, el diagnostico final y el rating (en los propios componentes)

//             CHAT CONSULTA */}
//             <div
//                 className={
//                     consultation.diagnostic ? 'hidden' : 'consultation-chat'
//                 }
//             >
//                 {/* <ChatComponent consultaId={id} /> */}
//             </div>

//             {/* DIAGNÓSTICO */}
//             <div className={consultation.diagnostic ? 'diagnostic' : 'hidden'}>
//                 <h3>Tu Diagnóstico</h3>
//                 <p>{consultation.diagnostic}</p>
//             </div>

//             {/* VOTACIÓN */}
//             <div className={consultation.diagnostic ? 'vote-form' : 'hidden'}>
//                 <h3>Tu Consulta</h3>
//                 <p>Valora el diagnóstico de tu especialista</p>
//                 <VoteForm />
//             </div>
//         </div>
//     );
// };

///////

import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { Button } from '../components/Button.jsx';
import {
    deleteConsultationService,
    getAllSkillsService,
    getConsultationDetailService,
    takeConsultationService,
} from '../services/fetchBackEnd.js';
import { VoteForm } from '../components/forms/VoteForm.jsx';

import { ChatComponent } from '../components/ChatComponent.jsx';
import { jwtDecode } from 'jwt-decode';
import { Carruselconsultas } from '../components/Landing/CarruselConsultas.jsx';
import { CarruselconsultasActivas } from '../components/Landing/CarruselConsultasActivas.jsx';
import { Estrellas } from '../components/Estrellas.jsx';

export const ConsultationPage = () => {
    const { consultationId } = useParams();
    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;

    const [consultation, setConsultation] = useState(null);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if (!consultationId || !token) {
            console.error('Falta el ID o el token');
            return;
        }
        const fetchData = async () => {
            const response = await getConsultationDetailService(
                consultationId,
                token
            );
            /* console.log('response:', response); */
            if (response.status === 'ok') {
                setConsultation(response.data);
            } else {
                /*  console.error('Error al obtener la consulta'); */
            }

            const skills = await getAllSkillsService();
            setSkills(skills.skills || []);
        };
        fetchData();
    }, [consultationId, token]);

    if (!consultation) {
        return (
            <div>
                <p>No hemos encontrado la consulta</p>
                <Link to="/" className="btn btn-azul">
                    Vuelve a Inicio
                </Link>
            </div>
        );
    }

    const isPatient = decodedToken.role === 'paciente';
    const isDoctor = decodedToken.role === 'doctor';
    const hasDiagnostic = !!consultation.diagnostic;
    const skill =
        skills.find((skill) => skill.id === consultation.skillId)?.Name ||
        'Especialidad desconocida';

    const doctorSkillId = decodedToken?.skillId;
    const canTakeConsultation =
        isDoctor && doctorSkillId === consultation.skillId;

    console.log('token:', token);

    console.log('decodedtoken:', decodedToken);
    console.log('ispatient:', isPatient);
    console.log('hasdiagnostic:', hasDiagnostic);
    console.log('consultation:', consultation);
    console.log('getAllSkillsServide:', getAllSkillsService());
    console.log('skill:', skill);

    const handleChangeResponderConsulta = async () => {
        
        try {
            const data = await takeConsultationService(consultationId, token);
            console.log('Consulta tomada exitosamente:', data);

            setConsultation((prev) => ({ ...prev, doctorId: decodedToken.id }));
        } catch (error) {
            console.error('Error al tomar la consulta:', error);
        }
    };

    const handleDeleteConsulta = async () => {
        
        try {
            const data = await deleteConsultationService(consultationId, token);
            console.log('Consulta borrada exitosamente:', data);

            const params = new URLSearchParams({
                type: 'success',
                message,
            });

            toast.success('Consulta registrada');
                        setTimeout(() => {
                            setIsLoading(false);
                            navigate(`/?${params.toString()}`);
                        }, 3000);

        } catch (error) {
            console.error('Error al borrar la consulta:', error);
        }
    };

    

    return (
        <section className="consultation-page">
            <h1 className="page-title">{consultation.title}</h1>
            <section className="consultation-info">
                <article>
                    <h4>Descripción</h4> <p>{consultation.description}</p>
                </article>
                <article>
                    <h4>Gravedad</h4> <p>{consultation.gravedad}</p>
                </article>
                <article>
                    <h4>Especialidad</h4> <p>{skill}</p>
                </article>
                <article>
                    <h4>Especialista asignado</h4>{' '}
                    <p>
                        {consultation.doctorName ||
                            'No hay especialista asignado'}
                    </p>
                </article>
                <article>
                    <h4>Estado</h4>{' '}
                    <p>
                        {hasDiagnostic
                            ? 'Consulta terminada'
                            : 'Consulta activa'}
                    </p>
                </article>
                {/* HAY QUE HACER FUNCIÓN HANDLECHANGE DEL BUTTON */}
                {!hasDiagnostic && isPatient && (
                    <Button className="btn btn-naranja"
                    onClick={handleDeleteConsulta}>
                        Eliminar Consulta
                    </Button>
                )}
                {!hasDiagnostic && canTakeConsultation && (
                    <Button
                        className="btn btn-naranja"
                        onClick={handleChangeResponderConsulta}
                    >
                        Responder a esta consulta
                    </Button>
                )}
                {!hasDiagnostic && isDoctor && !canTakeConsultation && (
                    <p className="no-take-consultation">
                        No puedes tomar esta consulta porque no coincide con tu
                        especialidad.
                    </p>
                )}
            </section>
            <section>
                <p>imagenes</p>
            </section>

            {/* Sección de chat (si no hay diagnóstico) */}
            {!hasDiagnostic && (
                <ChatComponent
                    consultationId={consultationId}
                    consultation={consultation}
                />
            )}

            {/* Diagnóstico y valoración (si hay diagnóstico) */}
            {hasDiagnostic && isPatient && (
                <>
                    <section className="diagnostic">
                        <h3>Diagnóstico</h3>
                        <p>{consultation.diagnostic}</p>
                    </section>
                    {isPatient && (
                        <section className="vote-form-section">
                            <h3>Valora el diagnóstico</h3>
                            <VoteForm consultationId={consultationId} />
                        </section>
                    )}
                </>
            )}

            {hasDiagnostic && isDoctor && (
                <>
                    <section className="diagnostic">
                        <h3>Valoración de tu respuesta</h3>

                        <Estrellas value={consultation.vote} />
                    </section>
                </>
            )}

            <section className="otras-consultas">
                <h2 className="page-title">Otras Consultas</h2>

                {isPatient && <Carruselconsultas />}
                {isDoctor && <CarruselconsultasActivas />}
            </section>
        </section>
    );
};
