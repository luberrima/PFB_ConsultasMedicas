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

export const newConsultService = async (info, token) => {

    console.log('Esto es lo que llega al server',info,token);
   

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
	console.log("Valor de message",message);
	console.log("Valor de data");

	return { message, data };
};

export const getDoctorProfileService = async (id,token) => {
    const response = await fetch(`${backEndPath}/users/doctors/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
	const { message, data } = await response.json();

	if (!response.ok) throw new Error(message);

    return { message, data };
};