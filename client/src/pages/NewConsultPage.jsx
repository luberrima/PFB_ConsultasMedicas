import { useEffect } from 'react';
import { ConsultForm } from '../components/forms/ConsultForm.jsx';

import logo from '../assets/good-doctor-logo.svg';
import illustration from '../assets/bubbles.svg';
import '../components/forms/forms.css';
import { FormContextProvider } from '../contexts/forms/FormContextProvider.jsx';
import { useProtect } from '../hooks/useProtect.js';
import { Link } from 'react-router-dom';

export const NewConsultPage = () => {
    useProtect('/new-travel');
    useEffect(() => {
        document.body.classList.add('no-header-footer');

        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);

    return (
        <div className="new-consult-page">
            <Link to="/">
                <img className="logo" src={logo} alt="logo Good Doctor" />
            </Link>
            <div className="form-card new-consultation-form-card">
                <h2>¿Tienes dudas médicas?</h2>
                <h1>Haz una consulta</h1>
                <p>Cuéntanos lo que te pasa</p>
                <FormContextProvider>
                    <ConsultForm />
                </FormContextProvider>
                <p>
                    <Link to="/" className="form-link-inicio">
                        Volver a Inicio
                    </Link>
                </p>
            </div>
            <img
                className="illustration new-consult-illustration"
                src={illustration}
                alt=""
            />
        </div>
    );
};
