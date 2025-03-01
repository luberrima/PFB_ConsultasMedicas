const backEndPath = import.meta.env.VITE_BACKEND_HOST;

export const getOwnUserService = async (token) => {
    const response = await fetch(`${backEndPath}/users/own`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};



export const newConsultService = async (info, token) => {
	const formData = new FormData();
	formData.append('title', info.title || '');
	formData.append('skill', info.place || '');
    formData.append('gravedad', info.place || '');
	formData.append('description', info.description || '');
	if (info.img1) formData.append('img1', info.img1);
	if (info.img2) formData.append('img2', info.img2);
	if (info.img3) formData.append('img3', info.img3);
    if (info.img4) formData.append('img4', info.img4);

	const response = await fetch(`${apiPath}/new-consultation`, {
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
