import { useEffect, useState } from 'react';
import { getAllUserService } from '../services/fetchBackEnd.js';
import { useAuth } from './useAuth.js';

export const useAllUser = () => {
    const { token } = useAuth();
    const [users, setUser] = useState([]);
    const [loading4, setLoading] = useState(true);
    const [error4, setError] = useState(null);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                setLoading(true);
                const users = await getAllUserService(token);
                setUser(users);
            } catch (error) {
                setError(error.message || 'Errror al obtener los usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchAllUser();
    }, []);
         
    return { users, loading4, error4 };
};