//creamos una funcion genereErrorUtils para tener info del error de forma Homogenea.

export const genereErrorUtils = (status, code, message) => {
    const error = new Error(message);
    error.httpStatus = status;
    error.code = code;
    return error;
}

