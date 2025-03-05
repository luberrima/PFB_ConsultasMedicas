export const joiErrorMessages = {
    'any.required': 'CLIENT: El campo "{#key}" es obligatorio',
    'string.base': 'CLIENT:El valor de "{#key}" debe ser una cadena',
    'string.empty': 'CLIENT:El campo "{#key}" no debe estar vacío',
    'number.base': 'CLIENT:El valor de "{#key}" debe ser un número',
    'number.max': 'CLIENT:El archivo no debe exceder los 5 MB',
    'number.min': 'CLIENT:El archivo debe tener al menos 1 byte',
    'object.base': 'CLIENT:El valor de "{#key}" debe ser un objeto',
    'any.only': 'CLIENT:Solo se permiten fotos jpeg o png',
    'string.email': 'CLIENT:Correo electrónico inválido',
    'string.pattern.base':
        'CLIENT:Al menos una mayúscula, una minúscula, un número y un caracter especial',
    'string.min':
        'CLIENT:El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max':
        'CLIENT:El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'CLIENT:No se permiten campos adicionales en este objeto',
};
