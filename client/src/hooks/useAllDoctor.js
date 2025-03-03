import { useEffect, useState } from 'react';
import { getAllDoctorsService } from '../services/fetchBackEnd.js';

export const useAllDoctor = () => {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				setLoading(true);
				const data = await getAllDoctorsService();
				setDoctors(data);
			} catch (error) {
				setError(error.message || 'Errror al obtener los Doctores');
			} finally {
				setLoading(false);
			}
		};

		fetchDoctors();
	}, []);

    /* console.log('Esto es lo que devuelve el useEllDoctor', doctors);  */
    
	return { doctors, loading, error };
};