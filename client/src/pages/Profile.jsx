import { Navigate } from 'react-router-dom';
import { ProfileCard } from '../components/UserProfile/ProfileCard.jsx';
import { useUser } from '../contexts/userContext.jsx';


import './Profile.css';

export function Profile() {
    const [user] = useUser();

     if (!user?.token) {
         return <Navigate to="/" />;
     }

    return (
        <div id="profileContainer">
            <div id="panelesUsuario">
                <ProfileCard
                    email={user.email}
                    avatar={user.avatar}
                    nombre={user.nombre}
                    username={user.username}
                />

                <UserCard
                    avatar={user.avatar}
                    username={user.username}
                    activatedButton={true}
                />
            </div>
        </div>
    );
}

