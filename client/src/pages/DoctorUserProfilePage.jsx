// import { useState } from 'react';
// import { useContext } from 'react';
// import { useAuth } from '../hooks/useAuth.js';
import { useParams } from 'react-router-dom';
// import { AuthContext } from '../contexts/auth/AuthContext.js';
import { DoctorUserProfile } from '../components/DoctorUserProfile.jsx';

export const DoctorUserProfilePage = () => {
    // const { token } = useContext(AuthContext);

    //const { token, currentUser } = useAuth();

    const { id } = useParams();

    return (
        <>
            <h1 className="page-title">Especialista </h1>

            <section>
                <DoctorUserProfile key={id} doctorId={id} />
            </section>
        </>
    );
};
