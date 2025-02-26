import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../Button.jsx';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';

// el token se tiene que llamar tokenGoodDoctor :)

export const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const backEndPath = import.meta.env.VITE_BACKEND_HOST;

    const handleSubmit = async (event) => {
        event.preventDefault();

        //gestión de errores
        const { value, error } = validateSchemaUtil(loginUserSchema, data);

        if (error) {
            setErrors(error.details);
        }

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
            localStorage.setItem('tokenGoodDoctor', result.data.token);

            navigate('/');
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
