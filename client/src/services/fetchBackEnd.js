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