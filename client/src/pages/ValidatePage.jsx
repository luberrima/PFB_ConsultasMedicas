import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../components/Loading.jsx';

export const ValidatePage = () => {
    const { registrationCode } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    useEffect(() => {
        document.body.classList.add('no-header-footer');

        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);

    useEffect(() => {
        toast.info('Estamos validando tu cuenta');
        const activeUser = async () => {
            try {
                const response = await fetch(
                    `${apiPath}/users/active/${registrationCode}`,
                    { method: 'PUT' }
                );
                if (response.ok) {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: 'success',
                        message: result.message,
                    });
                    navigate(`/login?${params.toString()}`);
                    return;
                } else {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: 'error',
                        message: result.message,
                    });
                    navigate(`/login?${params.toString()}`);
                    return;
                }
            } catch (error) {
                toast.error(error);
            }
        };

        const timer = setTimeout(() => {
            activeUser();
            setIsLoading(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, [registrationCode, apiPath, navigate]);
    return (
        <section className="validation-page">
            <h2 className="page-title">Validación de usuario</h2>
            {isLoading && (
                <p className="validate-text">Validando tu cuenta...</p>
            )}
            {!isLoading && <Loading />}
        </section>
    );
};
