import { useState } from 'react';
import { Button } from '../Button.jsx';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';

// el token se tiene que llamar tokenGoodDoctor :)

export const LoginForm = () => {
    const [info, setInfo] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Form handleSubmit={handleSubmit} className="login-form">
            <Input
                handleChange={handleChange}
                label="email"
                type="email"
                name="email"
                value={info.email}
            />
            <Input
                handleChange={handleChange}
                label="password"
                type="password"
                name="password"
                value={info.password}
            />
            <Button id="login-btn" type="submit" className="submit-btn">
                <p className="text-btn">Iniciar Sesión</p>
            </Button>
        </Form>
    );
};
