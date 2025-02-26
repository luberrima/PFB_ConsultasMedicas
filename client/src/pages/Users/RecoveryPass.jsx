import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RecoveryPass.css';

export default function RecoveryPass() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const URL_BACK = import.meta.env.VITE_URL_BACK;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const res = await fetch(`${URL_BACK}/users/password/recovery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const json = await res.json();
        if (res.ok) {
            setSuccess(true);
            setTimeout(() => navigate('/user/password/changepass'), 2000);
        } else {
            setError(
                json.error ||
                    'error al enviar la solicitud de recuperacion de contraseña'
            );
        }
    };

    return (
        <div className="areaFormulario">
            <h3>Recuperación de contraseña</h3>
            <div id="recovery" className="areaFormulario">
                <p>
                    Inserte su correo electrónico, para iniciar el proceso de
                    recuperación de contraseña:
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button>✔</button>
                    {success && <p>Correo de recuperación enviado</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}
