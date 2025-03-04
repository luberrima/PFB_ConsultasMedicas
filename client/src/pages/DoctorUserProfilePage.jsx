import { useState } from 'react';
import { useContext } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { DoctorUserProfile } from '../components/forms/DoctorUserProfile.jsx';



export const DoctorUserProfilePage = () => {

    const { token } = useContext(AuthContext);



    console.log("valor de token dentro de autocontex en el page doctor",useContext(AuthContext));
    //const { token, currentUser } = useAuth();
    

   const { id } = useParams();
   console.log("params de id",id)
   
     return (
            <>
                <h2>Perfil del doctor </h2>
                
     <section>

     <DoctorUserProfile key={id} doctorId={id} />

    </section>
            </>
        );



};