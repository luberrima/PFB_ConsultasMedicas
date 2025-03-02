import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { Button } from '../components/Button.jsx';
import { getConsultationDetailService } from '../services/fetchBackEnd.js';
import { VoteForm } from '../components/forms/VoteForm.jsx';

export const ConsultationPage = () => {
    const { consultationId } = useParams();
    console.log('consultation id:', consultationId);
    const { token } = useContext(AuthContext);
    const [consultation, setConsultation] = useState(null);

    useEffect(() => {
        if (!consultationId || !token) {
            console.error('Falta el ID o el token');
            return;
        }
        const fetchConsultation = async () => {
            const response = await getConsultationDetailService(
                consultationId,
                token
            );
            console.log('response en consultationpage:', response);
            console.log('consultationId en consultation page:', consultationId);
            console.log('token en consultation page:', token);
            console.log('response.status:', response.status);

            if (response.status === 'ok') {
                const data = await response.data;
                setConsultation(data);
            } else {
                console.error('Error al obtener la consulta');
            }
        };
        fetchConsultation();
    }, [consultationId, token]);

    if (!consultation) {
        return (
            <div>
                <p>No hemos encontrado la consulta</p>
                <Link to="/" className="navbar-link new-consultation-link">
                    Vuelve a Inicio
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="consultation-info">
                <h2>{consultation.title}</h2>
                <span>
                    <h3>Descripción</h3>
                    <p>{consultation.description}</p>
                </span>
                <span>
                    <h3>Gravedad:</h3>
                    <p>{consultation.gravedad}</p>
                </span>
                <span>
                    <h3>Especialidad:</h3>
                    <p>{consultation.skillId}</p>
                </span>
                <span>
                    <h3>Especialista asignado:</h3>
                    <p>
                        {consultation.doctorId
                            ? consultation.doctorId
                            : 'No hay especialista asignado'}
                    </p>
                </span>
                <span>
                    <h3>Estado de la consulta:</h3>
                    <p>
                        {consultation.diagnostic
                            ? 'Consulta terminada'
                            : 'Consulta activa'}
                    </p>
                </span>
                <div
                    className={
                        consultation.diagnostic
                            ? 'buttons'
                            : 'buttons-no-display'
                    }
                >
                    {/* Falta poner acciones a los botones */}
                    <Button className="complete-btn">Concluir consulta</Button>
                    <Button className="delete-btn">Eliminar Consulta</Button>
                </div>
            </div>

            {/* falta crear componentes fileupload y chat */}
            <div className="consulta-archivos">
                <h3>Archivos subidos</h3>
                {/* <FileUpload consultaId={id} /> */}
            </div>

            {/* !!!!!!! HAY QUE HACER UN CONTEXTO DE CUANDO HAY O NO DIAGNÓSTICO!!!!!!!
            y aplicarlo al chat, el diagnostico final y el rating (en los propios componentes)
            
            CHAT CONSULTA */}
            <div
                className={
                    consultation.diagnostic ? 'hidden' : 'consultation-chat'
                }
            >
                {/* <ChatComponent consultaId={id} /> */}
            </div>

            {/* DIAGNÓSTICO */}
            <div className={consultation.diagnostic ? 'diagnostic' : 'hidden'}>
                <h3>Tu Diagnóstico</h3>
                <p>{consultation.diagnostic}</p>
            </div>

            {/* VOTACIÓN */}
            <div className={consultation.diagnostic ? 'vote-form' : 'hidden'}>
                <h3>Tu Consulta</h3>
                <p>Valora el diagnóstico de tu especialista</p>
                <VoteForm />
            </div>
        </div>
    );
};
