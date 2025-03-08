const backEndPath = import.meta.env.VITE_BACKEND_HOST;

export const getOwnUserService = async (token) => {
    const response = await fetch(`${backEndPath}/users/profile`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response;
};

export const getAllDoctorsService = async () => {

    const response = await fetch(`${backEndPath}/users/doctors`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data;
};

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

export const getConsultationDetailService = async (consultationId, token) => {
    /*   console.log('token en service:', token);
    console.log('id en servide:', consultationId); */
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
        console.log('RESPONSE CONSULTATION:', response.data);
        /* console.log('repsonse en service:', response); */
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    'Error al obtener los detalles de la consulta'
            );
        }
        return response.json();
    } catch (error) {
        console.error('Error en getConsultationDetailService:', error);
        throw error;
    }
};

export const newConsultService = async (info, token) => {
    /* console.log('Esto es lo que llega al server',info,token); */

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

// FALTA GET ALL REPLIES CONTROLLER EN BACK
export const getChatMessagesService = async (consultationId, token) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}/replies`,
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
        console.error('Error en getChatMessages:', error);
        return { status: 'error', message: 'Error en la solicitud' };
    }
};

// ESTO HAY QUE REVISARLO
export const sendChatMessageService = async (
    consultationId,
    message,
    token
) => {
    try {
        const response = await fetch(
            `${backEndPath}/consultations/${consultationId}/replies`,
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
        console.error('Error en sendChatMessage:', error);
        return { status: 'error', message: 'Error en la solicitud' };
    }
};

export const getAllSkillsService = async () => {
    try {
        const response = await fetch(`${backEndPath}/skills`);
        const data = await response.json();
        if (data.status === 'ok') {
            return data.data;
        }
        /* console.log('data.data:', data.data); */
        throw new Error('Error al obtener las skills');
    } catch (error) {
        console.error('Error en getAllSkillsService:', error);
        return [];
    }
};

export const registerUserService = async (userData) => {
    try {
        const response = await fetch(`${backEndPath}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }

        const result = await response.json();


        return result;
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
};

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


export const deleteConsultationService = async (consultationId, token) => {
    console.log('Esta es la ruta del fech', `${backEndPath}/consultations${consultationId}`);

    const response = await fetch(`${backEndPath}/consultations/:${consultationId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token}`,
        },
    });
    console.log('Que devuelve respose de consul no asignadas', response);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    console.log(
        'esto es lo que retorna el deleteConsultarionsService',
        data
    );

    return data;
};

export const getConsultationImages = (userId, consultationId, files = []) => {



    if (!userId || !consultationId || files.length === 0) {


        return [];


    }





    return files.map((file) => ({


        url: `${backEndPath}/src/uploads/entries/${userId}/${consultationId}/${file.filename}`,


        name: file.filename,


    }));


};
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


        console.error('Error en takeConsultationService:', error);


        throw error;


    }


};



export const  getAllSkills= async () => {



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


        console.error('Error en servicegetskill:', error);


        throw error;


    }


};


export const  getAllDoctorBySkilfetch= async () => {



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


        console.error('Error en getalldoctorbyskill:', error);


        throw error;


    }


};

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
        console.error('Error al obtener el doctor:', error);
        return { status: 'error', message: 'No se pudo obtener el doctor' };
    }
};