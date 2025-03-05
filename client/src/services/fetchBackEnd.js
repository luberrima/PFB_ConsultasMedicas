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
    console.log('estoy dentro de getAllDoctorService');

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
    console.log('Esta es la ruta del fech', `${backEndPath}/consultations`);

    const response = await fetch(`${backEndPath}/consultations`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    console.log('Que devuelve respose de consul no asignadas', response);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    console.log(
        'esto es lo que retorna el getAllConsultas No asginadas Service',
        data
    );

    return data;
};

export const getConsultationDetailService = async (consultationId, token) => {
    console.log('token en service:', token);
    console.log('id en servide:', consultationId);
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
        console.log('repsonse en service:', response);
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
    console.log('Valor de message', message);
    console.log('Valor de data');

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

export const registerUserService = async (userData) => {
    console.log('userdata en registeruserservice:', userData);
    try {
        const response = await fetch(`${backEndPath}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        console.log('RESPONSE:', response);

        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }

        const result = await response.json();

        console.log('RESULT:', result);
        console.log('RESUKT.DATA:', result.data);
        console.log('RESULT.DATA?.DATA', result.data?.data);
        console.log('RESULT.DATA.DATA', result.data.data);

        return result;
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
};

export const registerDoctorService = async (doctorData) => {
    console.log('doctordata en registerdoctorservice:', doctorData);
    try {
        const response = await fetch(`${backEndPath}/users/register-doctor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData), // Pasamos los datos aquí
        });

        if (!response.ok) {
            throw new Error('Error al registrar el médico');
        }

        const result = await response.json();
        return result.message; // Suponiendo que la respuesta contiene un mensaje
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el médico');
    }
};
