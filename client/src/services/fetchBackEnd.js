// import { Navigate } from 'react-router-dom';
const backEndPath = import.meta.env.VITE_BACKEND_HOST;
const AdminPath = import.meta.env.VITE_BACKEND_ADMIN;

// ================================
// SERVICIOS DE USUARIO
// ================================

// Obtiene los datos del perfil del usuario autenticado.
export const getOwnUserService = async (token) => {
    const response = await fetch(`${backEndPath}/users/profile`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response;
};
// Obtiene el perfil del usuario con manejo de errores.

export const getOwnUserService2 = async (token) => {
    const response = await fetch(`${backEndPath}/users/profile`, {
        headers: {
            Authorization: token,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || 'Error al obtener el perfil de usuario'
        );
    }

    return await response.json();
};
// Obtiene datos del perfil del doctor autenticado.
export const getOwnUserService3 = async (token) => {
    const response = await fetch(`${backEndPath}/users/doctorsown`, {
        headers: {
            Authorization: token,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || 'Error al obtener el perfil de usuario'
        );
    }

    return await response.json();
};
// ================================
// SERVICIOS DE DOCTORES
// ================================

// Obtiene la lista de todos los doctores registrados en la plataforma.
// Retorna un array con la información de los doctores disponibles.
export const getAllDoctorsService = async () => {
    const response = await fetch(`${backEndPath}/users/doctors`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data;
};
// ================================
// SERVICIOS DE CONSULTAS MÉDICAS
// ================================

// Obtiene todas las consultas médicas del usuario autenticado.
// Retorna un array con la información de las consultas médicas asociadas al usuario.
export const getAllConsultasService = async (token) => {
    const response = await fetch(`${backEndPath}/users/profile`, {
        headers: {
            Authorization: `${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data;
};
// Obtiene todas las consultas médicas no asignadas a un doctor.
export const getAllConsulNoAsigService = async (token) => {
    const response = await fetch(`${backEndPath}/consultations`, {
        headers: {
            Authorization: `${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data;
};
// Obtiene los detalles de una consulta médica específica por su ID.
export const getConsultationDetailService = async (consultationId, token) => {

    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    'Error al obtener los detalles de la consulta'
            );
        }
        return response.json();
    } catch (error) {
        
        throw error;
    }
};


 //Crea una nueva consulta médica enviando los datos al backend.
// Obtiene todas las consultas médicas que aún no han sido asignadas a un doctor.
// Requiere autenticación y retorna un array de consultas médicas disponibles.
 
export const newConsultService = async (info, token) => {
    

    const formData = new FormData();
    formData.append('title', info.title || '');
    formData.append('skillId', info.skillId || '');
    formData.append('gravedad', info.gravedad || '');
    formData.append('doctorId', info.doctorId || '');
    formData.append('description', info.description || '');
    if (info.img1) formData.append('img1', info.img1);
    if (info.img2) formData.append('img2', info.img2);
    if (info.img3) formData.append('img3', info.img3);
    if (info.img4) formData.append('img4', info.img4);

    const response = await fetch(`${backEndPath}/new-consultation`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `${token}`,
        },
    });
    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return { message, data };
};
// ================================
// SERVICIOS DE DOCTORES
// ================================
//Obtiene el perfil de un doctor en base a su ID.
 
export const getDoctorProfileService = async (id, token) => {
    const response = await fetch(`${backEndPath}/users/doctors/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return { message, data };
};
// Obtiene los detalles de un doctor específico.
// Si ocurre un error, devuelve un mensaje indicando que no se pudo obtener la información.
export const getDoctorDetailService = async (doctorId, token) => {
    try {
        const response = await fetch(
            `${backEndPath}/users/doctors/${doctorId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        
        return { status: 'error', message: 'No se pudo obtener el doctor' };
    }
};

// ================================
// SERVICIOS DE CHAT
// ================================

// Obtiene los mensajes del chat de una consulta específica.
export const getChatMessagesService = async (consultationId, token) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}/getreplies`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
        );

        // Si la respuesta es exitosa, devolvemos los datos
        if (response.ok) {
            const data = await response.json();
            return { status: 'ok', data: data.messages }; // Asumimos que la API devuelve un array de mensajes bajo `data.messages`
        } else {
            // Si la respuesta no es exitosa, devolvemos un mensaje de error
            const errorData = await response.json();
            return {
                status: 'error',
                message: errorData.message || 'Error al obtener mensajes',
            };
        }
    } catch (error) {
        
        return { status: 'error', message: 'Error en la solicitud' };
    }
};

// Envía un mensaje dentro del chat de una consulta médica.
// En caso de éxito, retorna el mensaje enviado.
// En caso de error, retorna un mensaje indicando la falla.
export const sendChatMessageService = async (
    consultationId,
    message,
    token
) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}/sendreplies`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, // Agregar token para autenticación
                },
                body: JSON.stringify({
                    message: message, // El mensaje que el usuario está enviando
                }),
            }
        );

        // Si la respuesta es exitosa, devolvemos el mensaje enviado
        if (response.ok) {
            const data = await response.json();
            return { status: 'ok', data: data.message }; // Suponemos que la respuesta contiene el mensaje enviado
        } else {
            // Si hay error, devolver un mensaje de error
            const errorData = await response.json();
            return {
                status: 'error',
                message: errorData.message || 'Error al enviar el mensaje',
            };
        }
    } catch (error) {
        
        return { status: 'error', message: 'Error en la solicitud' };
    }
};
// Elimina un mensaje del chat en una consulta específica.
export const deleteChatMessageService = async (replyId, token) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/Replies/${replyId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
        );

        if (response.ok) {
            return { status: 'ok' };
        } else {
            const errorData = await response.json();
            return {
                status: 'error',
                message: errorData.message || 'Error al eliminar el mensaje',
            };
        }
    } catch (error) {
        
        return { status: 'error', message: 'Error en la solicitud' };
    }
};
// ================================
// SERVICIOS DE ESPECIALIDADES (SKILLS)
// ================================

// Obtiene todas las especialidades (skills) disponibles en la plataforma.
export const getAllSkillsService = async () => {
    try {
        const response = await fetch(`${backEndPath}/skills`);
        const data = await response.json();
        if (data.status === 'ok') {
            return data.data;
        }
       
        throw new Error('Error al obtener las skills');
    } catch (error) {
        
        return [];
    }
};
// ================================
// SERVICIOS DE USUARIOS
// ================================

// Registra un nuevo usuario en la plataforma.
export const registerUserService = async (userData) => {
    
        const response = await fetch(`${backEndPath}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

  

        const { message } = await response.json();
        if (!response.ok) throw new Error(message);
        return message;
    
};
// Registra un nuevo doctor en la plataforma.
export const registerDoctorService = async (doctorData) => {
    const response = await fetch(`${backEndPath}/users/register-doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData),
    });
    const { message } = await response.json();
    if (!response.ok) throw new Error(message);
    return message;
};
// ================================
// SERVICIOS DE CONSULTAS MÉDICAS
// ================================

// Elimina una consulta médica de la plataforma.
export const deleteConsultationService = async (consultationId, token) => {
    const response = await fetch(
        `${backEndPath}/consultations/${consultationId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`,
            },
        }
    );

    

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return response;
};
// Elimina el diagnóstico de una consulta médica.
export const deleteDiagnosticoService = async (consultationId, token) => {


    const response = await fetch(
        `${backEndPath}/consultations/removediagnost/${consultationId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `${token}`,
            },
        }
    );
    const { message, data } = await response.json();
    

    if (!response.ok) throw new Error(message);

    return response;
};
// Obtiene las imágenes asociadas a una consulta médica.
export const getConsultationImages = (userId, consultationId, files = []) => {
    if (!userId || !consultationId || files.length === 0) {
        return [];
    }

    return files.map((file) => ({
        url: `${backEndPath}/uploads/entries/${userId}/${consultationId}/${file.name}`,

        name: file.name,
    }));
};
// Toma una consulta médica y la asigna a un doctor.
export const takeConsultationService = async (consultationId, token) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/take/${consultationId}`,

            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `${token}`,
                },
            }
        );
     
        const data = await response.json();
      

        if (!response.ok) {
            throw new Error(data.message || 'Error al tomar la consulta');
        }

        return data;
    } catch (error) {
        

        throw error;
    }
};

// Actualiza el diagnóstico de una consulta médica.
export const updateDiagnosticService = async (
    consultationId,
    token,
    diagnostic
) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/updatediagnost/${consultationId}`,

            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `${token}`,
                },

                body: JSON.stringify({
                    diagnostic: diagnostic,
                }),
            }
        );

        const data = await response.json();

     

        if (!response.ok) {
            throw new Error(
                data.message || 'Error al actualizar el diagnóstico'
            );
        }

        return data;
    } catch (error) {
       

        throw error;
    }
};
// Registra un voto para una consulta médica.
export const voteConsultationService = async (consultationId, token, vote) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}/vote`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ vote }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar el voto');
        }

        return data;
    } catch (error) {
        
        throw error;
    }
};
// ================================
// SERVICIOS DE ESPECIALIDADES (SKILLS)
// ================================

// Obtiene todas las especialidades disponibles en la plataforma.
export const getAllSkills = async () => {
    try {
        const response = await fetch(
            `${backEndPath}/skills`,

            {
                method: 'get',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al tomar la skills');
        }

        return data;
    } catch (error) {
        

        throw error;
    }
};
// Obtiene todos los doctores filtrados por especialidad.
export const getAllDoctorBySkilfetch = async () => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/doctorbyskill`,
            {
                method: 'get',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al tomar la doctorskills');
        }

        return data;
    } catch (error) {
        

        throw error;
    }
};
// ================================
// SERVICIOS DE ADMINISTRADOR
// ================================

// Obtiene la lista de todos los usuarios registrados en la plataforma.
export const getAllUserService = async (token) => {
    try {
        const response = await fetch(`${AdminPath}alluser`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al los usuarios');
        }

        return data;
    } catch (error) {
        

        throw error;
    }
};
// Valida la cuenta de un doctor en la plataforma.
// Requiere autenticación y el ID del doctor a validar
export const validateDoctorService = async (userId, token) => {
    try {
        const response = await fetch(`${AdminPath}validate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify({
                doctorId: userId,
                validate: 1,
            }),
        });

        const data = await response.json();
        

        if (!response.ok) {
            throw new Error(data.message || 'Error al Validar el Doctor');
        }

        return response;
    } catch (error) {
        

        throw error;
    }
};
// Elimina un usuario de la plataforma.
// Requiere autenticación y el ID del usuario a eliminar.
// En caso de éxito, el usuario es eliminado de la base de datos.
// En caso de error, lanza un mensaje con la causa del fallo.
export const deleteUserService = async (userId, token) => {
 
    const response = await fetch(`${AdminPath}alluser/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            id: userId,
        }),
    });
    const { message, data } = await response.json();
    

    if (!response.ok) throw new Error(message);

    return response;
};
