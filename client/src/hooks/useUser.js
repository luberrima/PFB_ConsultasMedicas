import { useEffect, useState } from 'react';
import { getOwnUserService2, getOwnUserService3 } from '../services/fetchBackEnd.js';
import { useAuth } from './useAuth.js';

export const useUserProfile = (role) => {
    const [usersOwn, setUsersOwn] = useState([]);
    const [loadingOwn, setLoadingOwn] = useState(true);
    const [errorOwn, setErrorOwn] = useState(null);
    const { token } = useAuth();


    useEffect(() => {
        const fetchUsersOwn = async () => {
            try {
                setLoadingOwn(true);
                let data="";
                if (role==="paciente")
                {
                data = await getOwnUserService2(token);
                }  
                if (role==="admin")
                    {
                    data = await getOwnUserService2(token);
                    }  
                if (role==="doctor")
                    {
                    data = await getOwnUserService3(token);
                    } 
              
                setUsersOwn(data);
             
            } catch (error) {
                setErrorOwn(error.message || 'Error al obtener los usuarios');
            } finally {
                setLoadingOwn(false);
            }
        };

        fetchUsersOwn();
    }, [token]);

  
    
    return { usersOwn, loadingOwn, errorOwn };
};