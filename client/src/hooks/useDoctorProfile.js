import { useEffect, useState } from 'react';
import { getDoctorProfileService } from '../services/fetchBackEnd.js';

export const useDoctorProfile = (id) => {
    const [doctorsbio, setDoctorsbio] = useState([]);
    const [loadingbio, setLoadingbio] = useState(true);
    const [errorbio, setErrorbio] = useState(null);
  

    useEffect(() => {
        const fetchDoctorsbio = async () => {
            try {
                setLoadingbio(true);
                const data = await getDoctorProfileService(id);
                setDoctorsbio(data);
             
            } catch (error) {
                setErrorbio(error.message || 'Errror al obtener los Doctores');
            } finally {
                setLoadingbio(false);
            }
        };

        fetchDoctorsbio();
    }, []);

    
    return { doctorsbio, loadingbio, errorbio };
};