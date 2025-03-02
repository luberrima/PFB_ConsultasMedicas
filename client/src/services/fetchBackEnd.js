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

    console.log('esto es lo que trae el getAllDoctorsService', data);

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
