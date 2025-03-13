import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { Button } from '../components/Button.jsx';
import {
    deleteConsultationService,
    deleteDiagnosticoService,
    getAllSkillsService,
    getConsultationDetailService,
    getConsultationImages,
    getDoctorDetailService,
    takeConsultationService,
} from '../services/fetchBackEnd.js';
import { VoteForm } from '../components/forms/VoteForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ChatComponent } from '../components/ChatComponent.jsx';
import { jwtDecode } from 'jwt-decode';
import { Carruselconsultas } from '../components/Landing/CarruselConsultas.jsx';
import { CarruselconsultasActivas } from '../components/Landing/CarruselConsultasActivas.jsx';
import { Estrellas } from '../components/Estrellas.jsx';
import { DiagnosticForm } from '../components/forms/DiagnosticForm.jsx';

export const ConsultationPage = () => {
    const { consultationId } = useParams();
    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;



    const isPatient = decodedToken.role === 'paciente';
    const isDoctor = decodedToken.role === 'doctor';
    const doctorId = decodedToken.id;

    const [consultation, setConsultation] = useState(null);
    const [skills, setSkills] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [doctorSkill, setDoctorSkill] = useState('');

    const navigate = useNavigate();

    //datos doctor
    useEffect(() => {
        const fetchDoctorName = async () => {
            if (!consultation?.doctorId) return;

            try {
                const response = await getDoctorDetailService(
                    consultation.doctorId,
                    token
                );

               

                if (response.status === 'ok' && response.data) {
                    setDoctorName(response.data.userDoctor[0]?.username);
                    // setDoctorSkill(response.data.userDoctor?.skillId);
                } else {

                }
            } catch (error) {
                
            }
        };
        fetchDoctorName();
    }, [consultation?.doctorId, token]);

    //datos consulta
    useEffect(() => {
        if (!consultationId || !token) {
            
            return;
        }
        const fetchData = async () => {
            const response = await getConsultationDetailService(
                consultationId,
                token
            );
            
            if (response.status === 'ok') {
                setConsultation(response.data);
            } else {
                
            }

            const skills = await getAllSkillsService();

            setSkills(skills.skills || []);
        };
        fetchData();
    }, [consultationId, token]);

    

    //datos doctor de la consulta
    useEffect(() => {
        const fetchDoctorName = async () => {
            if (!consultation?.doctorId) return;
           
            try {
                const response = await getDoctorDetailService(
                    consultation?.doctorId,
                    token
                );

               

                if (response.status === 'ok' && response.data) {
                    
                    setDoctorName(response.data.userDoctor[0]?.username);
                } else {
  
                }
            } catch (error) {
                
            }
        };
        fetchDoctorName();
    }, [consultation?.doctorId, token]);

    //datos doctor logeado
    useEffect(() => {
        if (isDoctor) {
            const fetchLoggedDoctorDetails = async () => {
                try {
                    const response = await getDoctorDetailService(
                        decodedToken.id,
                        token
                    );
                   
                    if (response.status === 'ok') {
                       
                        setDoctorSkill(
                            response?.data?.userDoctor?.['0']?.skillId
                        );
                    }
                   
                } catch (error) {

                }
            };
           
            fetchLoggedDoctorDetails();
            
        }
    }, [isDoctor, decodedToken.id, token]);

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

    // const isPatient = decodedToken.role === 'paciente';
    // const isDoctor = decodedToken.role === 'doctor';

    const hasDiagnostic = !!consultation.diagnostic;

    const skill =
        skills.find((skill) => skill.id === consultation.skillId)?.Name ||
        'Especialidad desconocida';


    const canTakeConsultation =
        isDoctor && doctorSkill === consultation.skillId;

    const isMyConsultation = doctorId === consultation.doctorId;

    const hasVote = consultation.vote;

    const handleChangeResponderConsulta = async () => {
        if (!consultation.doctorId) {
            try {

                const data = await takeConsultationService(
                    consultationId,
                    token
                );



                setConsultation((prev) => ({
                    ...prev,
                    doctorId: decodedToken.id,
                }));

                toast.success('Has tomado la consulta con éxito');
            } catch (error) {
                
                toast.error('No se pudo tomar la consulta');
            }
        } else if (isMyConsultation) {
            toast.info('Esta consulta ya es tuya!');
        } else if (consultation.doctorId) {
            toast.error('Esta consulta ya está asignada a otrx especialista');
        }
    };

    const handleDeleteConsulta = async () => {
        


        if (!consultationId || !token) {
            toast.error('Faltan datos para eliminar la consulta.');
            return;
        }

        try {
            const response = await deleteConsultationService(
                consultationId,
                token
            );

            if (response.ok) {
                // Verifica que la respuesta no sea null o undefined
                toast.success('Consulta eliminada correctamente');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('No se pudo eliminar la consulta');
            }
        } catch (error) {
            
            toast.error('Hubo un problema al eliminar la consulta');
        }
    };

    const handleDeleteDiganostico = async () => {
        if (!consultationId || !token) {
            toast.error('Faltan datos para eliminar el diagnostico.');
            return;
        }

        try {
            const response = await deleteDiagnosticoService(
                consultationId,
                token
            );

            if (response.ok) {
                toast.success('Diganostico eliminado correctamente');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('No se pudo eliminar el diagnostico');
            }
        } catch (error) {
            
            toast.error('Hubo un problema al eliminar el diagnostico');
        }
    };

    const images = getConsultationImages(
        consultation.userId,
        consultation.id,
        consultation.documents || []
    );

   console.log("valor de doctorName",doctorName);
   

    return (
        <section className="consultation-page">
            <h1 className="page-title">{consultation.title}</h1>
            <section className="consultation-detail">
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
                        <p>{doctorName || 'No hay especialista asignado'}</p>
                    </article>
                    <article>
                        <h4>Estado</h4>{' '}
                        <p>
                            {hasDiagnostic
                                ? 'Consulta terminada'
                                : 'Consulta activa'}
                        </p>
                    </article>
              
                    {!hasDiagnostic && isPatient && (
                        <Button
                            className="btn btn-naranja"
                            handleClick={handleDeleteConsulta}
                        >
                            Eliminar Consulta
                        </Button>
                    )}
                    {!hasDiagnostic && canTakeConsultation && (
                        <Button
                            className="btn btn-naranja"
                            handleClick={handleChangeResponderConsulta}
                        >
                            Responder a esta consulta
                        </Button>
                    )}
                    {!hasDiagnostic && isDoctor && !canTakeConsultation && (
                        <p className="no-take-consultation">
                            No puedes tomar esta consulta porque no coincide con
                            tu especialidad.

                            


                        </p>
                    )}
                </section>
                <section className="consulta-archivos">
                    <h3>Archivos subidos</h3>
                    {images && images.length > 0 ? (
                        <div className="image-gallery">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    alt={img.name}
                                    className="uploaded-image"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="consultation-page-no-img">
                            No hay imágenes subidas para esta consulta.
                        </p>
                    )}
                </section>
            </section>

            {/* Sección de chat (si no hay diagnóstico) */}
            {!hasDiagnostic &&
                (isPatient || (isDoctor && isMyConsultation)) && (
                    <ChatComponent
                        consultationId={consultationId}
                        consultation={consultation}
                    />
                )}

            {/* INPUT PARA ESCRIBIR DIAGNOSTICO */}

            {!hasDiagnostic && isDoctor && isMyConsultation && (
                <section>
                    
                    <h3>Diagnóstico</h3>
                    <DiagnosticForm
                        consultationId={consultationId}
                        token={token}
                    />
                </section>
            )}

            {/* Diagnóstico y valoración (si hay diagnóstico) */}
            {hasDiagnostic && (
                <>
                    <section className="diagnostic">
                        <h3>Diagnóstico</h3>
                        <p>{consultation.diagnostic}</p>
                    </section>
                </>
            )}

            {isDoctor && hasDiagnostic && !hasVote && (
                <Button
                    className="btn btn-naranja"
                    handleClick={handleDeleteDiganostico}
                >
                    Eliminar Diagnostico
                </Button>
            )}

            {isPatient && hasDiagnostic && !hasVote && (
                <>
                    <section className="vote-form-section">
                        <h3>Valora el diagnóstico</h3>
                        <VoteForm
                            consultationId={consultationId}
                            token={token}
                        />
                    </section>
                </>
            )}

            {hasDiagnostic && hasVote && (
                <>
                    <section className="diagnostic">
                        <h3>Valoración de la respuesta</h3>

                        <Estrellas rating={consultation.vote} />
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
