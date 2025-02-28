const backEndPath = import.meta.env.VITE_BACKEND_HOST;

export const getOwnUserService = async (token) => {
    const response = await fetch(`${backEndPath}/users/own`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
