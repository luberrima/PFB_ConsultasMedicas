import { useEffect, useState } from 'react';
import { getAllSkills } from '../services/fetchBackEnd.js';


export const getallskills = () => {
    const [skills, setskills] = useState([]);
    const [skillsloading, setskillsloading] = useState(true);
    const [skillserror, setskillsError] = useState(null);

    useEffect(() => {
        const fetchskills = async () => {
            try {
                setskillsloading(true);
                const data = await getAllSkills();
                setskills(data);
            } catch (error) {
                setskillsError(error.message || 'Errror al obtener las skills');
            } finally {
                setskillsloading(false);
            }
        };

        fetchskills();
    }, []);

     
    
    return { skills, skillsloading, skillserror };
};