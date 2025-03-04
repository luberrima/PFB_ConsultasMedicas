import { useState, useEffect } from 'react';
import {getOwnUserService} from '../services/fetchBackEnd.js';


export const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getOwnUserService(userId);
                setUser(data);

            }catch (error) {
                setError(error.message || 'Error al obtener el usuario');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return { user, loading, error };
};
