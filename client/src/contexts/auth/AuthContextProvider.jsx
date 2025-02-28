import { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import { getFromLocalStorage, setLocalStorage } from '../../utils/helpers.js';
import { getOwnUserService } from '../../services/fetchBackEnd.js';

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(
        getFromLocalStorage('tokenGoodDoctor') || null
    );
    const [currentUser, setCurrentUser] = useState(null);

    const onLogin = async (token) => {
        try {
            setToken(token);
            setLocalStorage('tokenGoodDoctor', token);

            const response = await getOwnUserService(token);

            if (response.ok) {
                const result = await response.json();
                setCurrentUser(result.data);
            } else {
                localStorage.removeItem('tokenGoodDoctor');
                setToken(null);
                setCurrentUser(null);

                const error = await response.json();
                throw new Error(error.message || 'Error de autenticación');
            }
        } catch (error) {
            localStorage.removeItem('tokenGoodDoctor');
            setToken(null);
            setCurrentUser(null);

            throw error;
        }
    };

    const onLogOut = () => {
        localStorage.removeItem('tokenGoodDoctor');
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, currentUser, onLogin, onLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};
