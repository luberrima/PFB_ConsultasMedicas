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
    getAllSkillsService,
    getConsultationDetailService,
} from '../services/fetchBackEnd.js';
import { VoteForm } from '../components/forms/VoteForm.jsx';

import { ChatComponent } from '../components/ChatComponent.jsx';
import { jwtDecode } from 'jwt-decode';

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
            console.log('response:', response);
            if (response.status === 'ok') {
                setConsultation(response.data);
            } else {
                console.error('Error al obtener la consulta');
            }

            const skills = await getAllSkillsService();
            setSkills(skills.skills || []);
            console.log('Skills:', skills);
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

    console.log('token:', token);
    console.log('decodedtoken:', decodedToken);
    console.log('ispatient:', isPatient);
    console.log('hasdiagnostic:', hasDiagnostic);
    console.log('consultation:', consultation);
    console.log('getAllSkillsServide:', getAllSkillsService());
    console.log('skill:', skill);

    return (
        <div>
            <div className="consultation-info">
                <h1 className="page-title">{consultation.title}</h1>
                <p>
                    <strong>Descripción:</strong> {consultation.description}
                </p>
                <p>
                    <strong>Gravedad:</strong> {consultation.gravedad}
                </p>

                {/* FALTA PONER LA SKILL CON NOMBRE */}
                <p>
                    <strong>Especialidad:</strong> {skill}
                </p>

                {/* FALTA PONER EL DOCTOR CON NOMBRE */}
                <p>
                    <strong>Especialista asignado:</strong>{' '}
                    {consultation.doctorName || 'No hay especialista asignado'}
                </p>
                <p>
                    <strong>Estado:</strong>{' '}
                    {hasDiagnostic ? 'Consulta terminada' : 'Consulta activa'}
                </p>

                {/* HAY QUE HACER FUNCIÓN HANDLECHANGE DEL BUTTON */}
                {!hasDiagnostic && isPatient && (
                    <Button className="btn btn-naranja">
                        Eliminar Consulta
                    </Button>
                )}

                {/* FALTA EL HANDLE CHANGE. HAY QUE HACER UN FETCH A LA RUTA DE TAKE CONSULT CREO*/}
                {!hasDiagnostic && isDoctor && (
                    <Button className="btn btn-naranja">
                        Responder a esta consulta
                    </Button>
                )}
            </div>

            {/* Sección de chat (si no hay diagnóstico) */}
            {!hasDiagnostic && (
                <ChatComponent consultationId={consultationId} />
            )}

            {/* Diagnóstico y valoración (si hay diagnóstico) */}
            {hasDiagnostic && isPatient && (
                <div className="diagnostic">
                    <h3>Diagnóstico:</h3>
                    <p>{consultation.diagnostic}</p>
                    {isPatient && (
                        <div className="vote-form">
                            <h3>Valora el diagnóstico</h3>
                            <VoteForm consultationId={consultationId} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
