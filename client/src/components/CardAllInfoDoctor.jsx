import React from 'react';
import { Link } from 'react-router-dom';
import { Estrellas } from './Estrellas.jsx';
import avatardefault from "../assets/avatar-default.jpg"

const staticPath = import.meta.env.VITE_BACKEND_STATIC;



export const CardAllInfoDoctor = ({ doctor }) => {
    let urlavatar="/src/assets/avatar-default.png"
if(doctor.avatar)
{
    urlavatar=`${staticPath}/avatars/${doctor.userId}/${doctor.avatar}`;
}
    const urllink=`/new-consult/${doctor.userId}/${doctor.skillId}`

    return (
        <> 
            <section>
            <Link
                to={`/users/doctors/${doctor.userId}`}
                className="link-card-doctor"
            >
                <li className="card-doctor">
                    <header>
                          
                            <img
                                src={urlavatar}
                                alt="Foto usuario"
                                onError={(e) => {
                                    e.target.onerror = null;  
                                    e.target.src = avatardefault; 
                                }}

                            />
                    
                        <div>
                            <h3>{doctor.username}</h3>
                            <p>{doctor.Name}</p>
                            <span>
                                <Estrellas rating={doctor.averageRating} />
                            </span>
                        </div>
                    </header>
                    {/* <p>Especialidad por numero: {doctor.skillId}</p> */}
                    <main>
                        <p>{doctor.bio}</p>
                    </main>
                    {/* <p>Email: {doctor.email}</p>
                <p>Numero de colegiado: {doctor.CollegeNumber}</p>
                <p>Fecha de inicio en GoodDoctor: {doctor.credatedAt}</p>
                <p>Identificacion en GoodDoctor {doctor.UserId}</p> */}  
                </li>
            </Link>
            <footer>
                        <Link to={urllink} className="btn btn-azul">
                            Hacer una consulta
                        </Link>
            </footer>
        </section>
        </>
    );
};
