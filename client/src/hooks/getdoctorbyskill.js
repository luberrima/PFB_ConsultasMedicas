import { useEffect, useState } from 'react';
import { getAllDoctorBySkilfetch } from '../services/fetchBackEnd.js';

export const getAllDoctorBySkill = () => {
    const [doctorbyskills, setDoctorbyskills] = useState([]);
    const [doctorbyskillsloading, setDoctorbyskillsloading] = useState(true);
    const [doctorbyskillserror, setDoctorbyskillsError] = useState(null);

    useEffect(() => {
        const fetchDoctorbyskills = async () => {
            try {
                setDoctorbyskillsloading(true);
                const data = await getAllDoctorBySkilfetch();
                setDoctorbyskills(data.data.doctorskill);
            } catch (error) {
                setDoctorbyskillsError(error.message || 'Error al obtener las skills');
            } finally {
                setDoctorbyskillsloading(false);
            }
        };
        
        fetchDoctorbyskills();
    }, []);
     
   
    return { doctorbyskills, doctorbyskillsloading, doctorbyskillserror };
};