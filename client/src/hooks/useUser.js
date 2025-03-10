import { useEffect, useState } from 'react';
import { getOwnUserService2 } from '../services/fetchBackEnd.js';
import { useAuth } from './useAuth.js';

export const useUserProfile = () => {
    const [usersOwn, setUsersOwn] = useState([]);
    const [loadingOwn, setLoadingOwn] = useState(true);
    const [errorOwn, setErrorOwn] = useState(null);
    const { token } = useAuth();


    useEffect(() => {
        const fetchUsersOwn = async () => {
            try {
                setLoadingOwn(true);
                const data = await getOwnUserService2(token);
                console.log("LO QUE TIENE EL USEUSERPROFILE",data);
                
                setUsersOwn(data);
             
            } catch (error) {
                setErrorOwn(error.message || 'Error al obtener los usuarios');
            } finally {
                setLoadingOwn(false);
            }
        };

        fetchUsersOwn();
    }, []);

    console.log("esto es lo que devuelve usersOwn", usersOwn);
    
    return { usersOwn, loadingOwn, errorOwn };
};