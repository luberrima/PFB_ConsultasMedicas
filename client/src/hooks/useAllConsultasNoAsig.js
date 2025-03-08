import { useEffect, useState } from 'react';
import { getAllConsulNoAsigService} from '../services/fetchBackEnd.js';
import { useAuth } from './useAuth.js';

export const useAllConsultasNoAsig = () => {
    const { token } = useAuth();
    const [consultasAllAs, setConsultas] = useState([]);
    const [loading2, setLoading] = useState(true);
    const [error2, setError] = useState(null);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                setLoading(true);
                const data = await getAllConsulNoAsigService(token);
                setConsultas(data);
            } catch (error) {
                setError(error.message || 'Errror al obtener las consultas');
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, []);

    
    return { consultasAllAs, loading2, error2 };
};