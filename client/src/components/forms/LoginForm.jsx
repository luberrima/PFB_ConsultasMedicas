import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../Button.jsx';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
import { AuthContext } from '../../contexts/auth/AuthContext.js';
import { toast } from 'react-toastify';

// el token se tiene que llamar tokenGoodDoctor :)

export const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const { onLogin, token } = useContext(AuthContext);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // comprobar si hay token

        if (token) {
            toast.info('¡Ya has iniciado sesión!');
            navigate('/');
        }
    }, [token, navigate]);

    const backEndPath = import.meta.env.VITE_BACKEND_HOST;

    const handleSubmit = async (event) => {
        event.preventDefault();

        //gestión de errores
        setErrors([]);
        toast.dismiss();

        const { value, error } = validateSchemaUtil(loginUserSchema, data);

        if (error) {
            setErrors(error.details);
            return;
        }

        try {
            const response = await fetch(`${backEndPath}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });
            console.log(response);

            if (response.ok) {
                const result = await response.json();

                const token = result.data || result.token;
                console.log('Token:', token);

                if (!token) {
                    console.error('No se recibió un token válido');
                    return;
                }

                await onLogin(token);

                toast.success('Te damos la bienvenida');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                const errorResult = await response.json();
                const errorMessage =
                    errorResult.message || 'Error en las credenciales';

                setErrors([
                    {
                        message: errorMessage,
                    },
                ]);
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Error durante el fetch:', error);
            setErrors([
                {
                    message:
                        'Error en la conexión al servidor. Intenta de nuevo más tarde.',
                },
            ]);
            toast.error(
                'Error en la conexión con el servidor. Intenta de nuevo más tarde'
            );
        }
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        console.log(
            'lo que hay en el input:',
            'name:',
            event.target.name,
            'value.',
            event.target.value
        );
    };

    return (
        <Form handleSubmit={handleSubmit} className="form login-form">
            <Input
                handleChange={handleChange}
                label="email"
                type="email"
                name="email"
                value={data.email}
                errors={errors}
                placeholder="Escribe aquí tu correo electrónico"
            />
            <Input
                handleChange={handleChange}
                label="Contraseña"
                type="password"
                name="password"
                value={data.password}
                errors={errors}
                placeholder="Escribe aquí tu contraseña"
            />
            <Button id="login-btn" type="submit" className="submit-btn">
                <p className="text-btn">Iniciar Sesión</p>
            </Button>
        </Form>
    );
};
