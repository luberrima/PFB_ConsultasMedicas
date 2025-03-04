import { useEffect, useState } from 'react';
import { getAllConsultasService } from '../services/fetchBackEnd.js';
import { useAuth } from './useAuth.js';

export const useAllConsultas = () => {
    const { token } = useAuth();
    const [consultas, setConsultas] = useState([]);
    const [loading2, setLoading] = useState(true);
    const [error2, setError] = useState(null);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                setLoading(true);
                const data = await getAllConsultasService(token);
                setConsultas(data);
            } catch (error) {
                setError(error.message || 'Errror al obtener las consultas');
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, []);

     
    
    return { consultas, loading2, error2 };
};